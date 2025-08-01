using Microsoft.EntityFrameworkCore;
using Elezea;
using Elezea.DTOs;
using Elezea.Services;
using Microsoft.AspNetCore.OpenApi;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// Register LLM services
builder.Services.AddSingleton<ISubmissionQueue, SubmissionQueue>();
builder.Services.AddScoped<ILlmEvaluationService, LlmEvaluationService>();
builder.Services.AddHostedService<LlmEvaluationBackgroundService>();
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

var api = app.MapGroup("/api");

api.MapGet("images/random", async (AppDbContext context, string langCode = "en") =>
{
    var image = await context.Descriptions
    .Include(d => d.Image)
    .Include(d => d.Language)
    .Where(d => d.Language.Code == langCode)
    .OrderBy(d => EF.Functions.Random())
    .Select(d => new ImageDto
    {
        Id = d.Image.Id,
        Url = d.Image.Url,
        DescriptionText = d.Text,
        LanguageCode = d.Language.Code
    })
    .FirstOrDefaultAsync();

    if (image == null)
    {
        return Results.NotFound(new { Message = $"No images found for language code {langCode}" });
    }

    return Results.Ok(image);
}).Produces<ImageDto>(StatusCodes.Status200OK)
.Produces(StatusCodes.Status404NotFound)
.WithOpenApi();

api.MapPost("images/submit", async (AppDbContext context, SubmitImageDto request, ISubmissionQueue submissionQueue) =>
{
    // Validate that the image exists
    var image = await context.Images.FindAsync(request.ImageId);
    if (image == null)
    {
        return Results.BadRequest(new { Message = "Image not found" });
    }

    // Validate that the language exists
    var language = await context.Languages.FirstOrDefaultAsync(l => l.Code == request.LangCode);
    if (language == null)
    {
        return Results.BadRequest(new { Message = "Language not found" });
    }

    // Check if there's a description for this image in the target language
    var descriptionExists = await context.Descriptions
        .AnyAsync(d => d.ImageId == request.ImageId && d.LanguageId == language.Id);

    if (!descriptionExists)
    {
        return Results.BadRequest(new { Message = "No reference description available for this image in the specified language" });
    }

    // Create submission
    var submission = new Elezea.Models.Submission
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

    // Add to processing queue
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

    // Parse corrections and suggestions if available
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
            // Handle malformed JSON gracefully
        }
    }

    return Results.Ok(statusDto);
}).Produces<SubmissionStatusDto>(StatusCodes.Status200OK)
.Produces(StatusCodes.Status404NotFound)
.WithOpenApi();

app.Run();
