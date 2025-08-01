using Microsoft.EntityFrameworkCore;
using Elezea;
using Elezea.DTOs;
using Elezea.Services;
using Elezea.Models;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

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
