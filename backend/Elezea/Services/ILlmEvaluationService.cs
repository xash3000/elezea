using Elezea.DTOs;

namespace Elezea.Services;

public interface ILlmEvaluationService
{
    Task<LlmEvaluationResult> EvaluateSubmissionAsync(int submissionId, string userDescription, string correctDescription, string languageCode);
}