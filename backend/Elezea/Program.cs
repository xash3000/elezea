using Microsoft.EntityFrameworkCore;
using Elezea;
using Elezea.DTOs;
using Microsoft.AspNetCore.OpenApi;
using Microsoft.Extensions.Logging;
using Elezea.Services;
using Elezea.Models;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

// Configure logging
builder.Logging
    .AddConsole()
    .AddFilter("Microsoft.EntityFrameworkCore.Database.Command", LogLevel.Warning)
    .SetMinimumLevel(LogLevel.Information);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(options =>
    options.AddPolicy("AllowFrontend", policy =>
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod()));

builder.Services.AddSingleton<ISubmissionQueue, SubmissionQueue>();
builder.Services.AddScoped<ILlmEvaluationService, LlmEvaluationService>();
builder.Services.AddHostedService<LlmEvaluationBackgroundService>();

var app = builder.Build();
app.UseCors("AllowFrontend");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

var api = app.MapGroup("/api");
var logger = app.Logger;

api.MapGet("images/random", async (AppDbContext context, string langCode = "en") =>
{
    try
    {
        // Get all valid IDs first (minimal data transfer)
        var validIds = await context.Descriptions
            .Include(d => d.Language)
            .Where(d => d.Language.Code == langCode)
            .Select(d => d.Id)
            .ToListAsync();

        if (validIds.Count == 0)
        {
            logger.LogWarning("No images found for language: {LangCode}", langCode);
            return Results.NotFound(new { Message = $"No images for {langCode}" });
        }

        // Select random ID in memory
        var randomIndex = new Random().Next(0, validIds.Count);
        var selectedId = validIds[randomIndex];

        // Get full image data
        var image = await context.Descriptions
            .Include(d => d.Image)
            .Include(d => d.Language)
            .Where(d => d.Id == selectedId)
            .Select(d => new ImageDto
            {
                Id = d.Image.Id,
                Url = d.Image.Url,
                DescriptionText = d.Text,
                LanguageCode = d.Language.Code
            })
            .FirstAsync();

        logger.LogInformation("Served image {ImageId} (URL: {ImageUrl})", image.Id, image.Url);
        return Results.Ok(image);
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "Failed to fetch image for {LangCode}", langCode);
        return Results.Problem("Server error");
    }
})
.WithName("GetRandomImage")
.Produces<ImageDto>(StatusCodes.Status200OK)
.Produces(StatusCodes.Status404NotFound)
.Produces(StatusCodes.Status500InternalServerError)
.WithOpenApi();

api.MapPost("images/submit", async (AppDbContext context, SubmitDescriptionDto request, ISubmissionQueue submissionQueue) =>
{
    var data = await context.Descriptions
        .Include(d => d.Image)
        .Include(d => d.Language)
        .Where(d => d.ImageId == request.ImageId && d.Language.Code == request.LangCode)
        .Select(d => new { d.Image, d.Language })
        .FirstOrDefaultAsync();

    if (data == null)
    {
        return Results.BadRequest(new { Message = "Invalid request: image not found, language not supported, or no reference description available" });
    }

    var image = data.Image;
    var language = data.Language;

    var submission = new Submission
    {
        ImageId = request.ImageId,
        LanguageId = language.Id,
        UserDescription = request.UserDescription,
        Evaluated = false,
        Image = image,
        Language = language
    };

    context.Submissions.Add(submission);
    await context.SaveChangesAsync();

    await submissionQueue.EnqueueAsync(submission.Id);

    return Results.Created($"/api/submission/{submission.Id}/status", new { Id = submission.Id });
}).Produces(StatusCodes.Status201Created)
.Produces(StatusCodes.Status400BadRequest)
.WithOpenApi();

api.MapGet("submission/{id:int}/status", async (AppDbContext context, int id) =>
{
    var submission = await context.Submissions
        .Include(s => s.Language)
        .FirstOrDefaultAsync(s => s.Id == id);

    if (submission == null)
    {
        return Results.NotFound(new { Message = "Submission not found" });
    }

    var statusDto = new SubmissionStatusDto
    {
        Id = submission.Id,
        IsEvaluated = submission.Evaluated,
        Score = submission.Score,
        CreatedAt = submission.CreatedAt
    };

    if (submission.Evaluated && !string.IsNullOrEmpty(submission.Feedback))
    {
        try
        {
            var evaluationResult = JsonSerializer.Deserialize<LlmEvaluationResult>(submission.Feedback);
            if (evaluationResult != null)
            {
                statusDto.Corrections = evaluationResult.Corrections;
                statusDto.Suggestions = evaluationResult.Suggestions;
            }
        }
        catch (JsonException)
        {
            return Results.Problem("Failed to parse submission feedback", statusCode: StatusCodes.Status500InternalServerError);
        }
    }

    return Results.Ok(statusDto);
}).Produces<SubmissionStatusDto>(StatusCodes.Status200OK)
.Produces(StatusCodes.Status404NotFound)
.Produces(StatusCodes.Status500InternalServerError)
.WithOpenApi();

app.Run();