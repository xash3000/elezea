using Elezea.DTOs;

namespace Elezea.Services;

public class LlmEvaluationService : ILlmEvaluationService
{
    private readonly ILogger<LlmEvaluationService> _logger;

    public LlmEvaluationService(ILogger<LlmEvaluationService> logger)
    {
        _logger = logger;
    }

    public async Task<LlmEvaluationResult> EvaluateSubmissionAsync(int submissionId, string userDescription, string correctDescription, string languageCode)
    {
        _logger.LogInformation("Starting LLM evaluation for submission {SubmissionId}", submissionId);

        // Placeholder implementation - simulate LLM processing time
        await Task.Delay(TimeSpan.FromSeconds(20));

        // TODO: Replace with actual LLM API call
        // This would typically call an external LLM service like OpenAI, Azure OpenAI, etc.

        var result = new LlmEvaluationResult
        {
            Score = 0.85f, // Placeholder score
            Corrections = new List<List<string>>
            {
                new() { "houze", "house" },
                new() { "beutiful", "beautiful" }
            },
            Suggestions = new List<string>
            {
                "Consider adding more descriptive adjectives",
                "The sentence structure could be improved"
            }
        };

        _logger.LogInformation("LLM evaluation completed for submission {SubmissionId} with score {Score}", submissionId, result.Score);

        return result;
    }
}
