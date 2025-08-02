using Microsoft.EntityFrameworkCore;
using Elezea.Services;
using System.Text.Json;

namespace Elezea.Services;

public class LlmEvaluationBackgroundService : BackgroundService
{
    private readonly IServiceProvider _serviceProvider;
    private readonly ILogger<LlmEvaluationBackgroundService> _logger;
    private readonly ISubmissionQueue _submissionQueue;

    public LlmEvaluationBackgroundService(
        IServiceProvider serviceProvider,
        ILogger<LlmEvaluationBackgroundService> logger,
        ISubmissionQueue submissionQueue)
    {
        _serviceProvider = serviceProvider;
        _logger = logger;
        _submissionQueue = submissionQueue;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("LLM Evaluation Background Service started");

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                // Wait for a submission to be queued
                var submissionId = await _submissionQueue.DequeueAsync(stoppingToken);
                await ProcessSubmission(submissionId, stoppingToken);
            }
            catch (OperationCanceledException)
            {
                // Expected when cancellation is requested
                break;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while processing submission");
                // Continue processing other submissions
            }
        }
    }

    private async Task ProcessSubmission(int submissionId, CancellationToken cancellationToken)
    {
        using var scope = _serviceProvider.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var llmService = scope.ServiceProvider.GetRequiredService<ILlmEvaluationService>();

        try
        {
            _logger.LogInformation("Processing submission {SubmissionId}", submissionId);

            var submission = await context.Submissions
                .Include(s => s.Image)
                .Include(s => s.Language)
                .FirstOrDefaultAsync(s => s.Id == submissionId && !s.Evaluated, cancellationToken);

            if (submission == null)
            {
                _logger.LogWarning("Submission {SubmissionId} not found or already evaluated", submissionId);
                return;
            }

            // Get the correct description for this image in the target language
            var correctDescription = await context.Descriptions
                .Include(d => d.Image)
                .Include(d => d.Language)
                .Where(d => d.Image.Id == submission.ImageId && d.Language.Id == submission.LanguageId)
                .Select(d => d.Text)
                .FirstOrDefaultAsync(cancellationToken);

            if (correctDescription == null)
            {
                _logger.LogWarning("No correct description found for submission {SubmissionId}", submissionId);
                return;
            }

            var result = await llmService.EvaluateSubmissionAsync(
                submission.Id,
                submission.UserDescription,
                correctDescription,
                submission.Language.Code);

            // Update the submission with the results
            submission.Evaluated = true;
            submission.Score = result.Score;
            submission.Feedback = JsonSerializer.Serialize(result);

            await context.SaveChangesAsync(cancellationToken);

            _logger.LogInformation("Successfully processed submission {SubmissionId}", submissionId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing submission {SubmissionId}", submissionId);
        }
    }
}
