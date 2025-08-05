using Elezea.DTOs;
using Elezea.Configuration;
using Microsoft.Extensions.Options;
using Mscc.GenerativeAI;
using System.Text.Json;

namespace Elezea.Services;

public class LlmEvaluationService : ILlmEvaluationService
{
    private readonly ILogger<LlmEvaluationService> _logger;
    private readonly GeminiAIOptions _geminiOptions;
    private readonly GoogleAI _googleAI;

    public LlmEvaluationService(
        ILogger<LlmEvaluationService> logger,
        IOptions<GeminiAIOptions> geminiOptions)
    {
        _logger = logger;
        _geminiOptions = geminiOptions.Value;

        if (string.IsNullOrEmpty(_geminiOptions.ApiKey))
        {
            throw new InvalidOperationException("Gemini API Key is not configured. Please set the GeminiAI:ApiKey in your configuration.");
        }

        _googleAI = new GoogleAI(_geminiOptions.ApiKey);
    }

    public async Task<LlmEvaluationResult> EvaluateSubmissionAsync(int submissionId, string userDescription, string correctDescription, string languageCode)
    {
        _logger.LogInformation("Starting LLM evaluation for submission {SubmissionId}", submissionId);

        try
        {
            var model = _googleAI.GenerativeModel(_geminiOptions.Model);

            var prompt = CreateEvaluationPrompt(userDescription, correctDescription, languageCode);

            _logger.LogDebug("Sending prompt to Gemini: {Prompt}", prompt);

            var response = await model.GenerateContent(prompt);

            if (response?.Text == null)
            {
                _logger.LogWarning("Gemini returned empty response for submission {SubmissionId}", submissionId);
                return CreateFallbackResult();
            }

            var result = ParseGeminiResponse(response.Text);

            _logger.LogInformation("LLM evaluation completed for submission {SubmissionId} with score {Score}",
                submissionId, result.Score);

            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during LLM evaluation for submission {SubmissionId}", submissionId);

            // Return a fallback result instead of throwing
            return CreateFallbackResult();
        }
    }

    private string CreateEvaluationPrompt(string userDescription, string correctDescription, string languageCode)
    {
        return $@"You are an expert language learning assistant evaluating a student's description of an image. Your task is to:

1. Compare the student's description with the correct description
2. Identify spelling and grammar errors
3. Provide constructive feedback and suggestions for improvement
4. Give a score between 0.0 and 1.0 based on accuracy, grammar, and completeness

**Language:** {languageCode}
**Correct Description:** {correctDescription}
**Student's Description:** {userDescription}

Please analyze the student's description and respond with a JSON object in this exact format:
{{
  ""score"": 0.85,
  ""corrections"": [
    [""incorrect_word"", ""correct_word""],
    [""another_error"", ""correction""]
  ],
  ""suggestions"": [
    ""Specific suggestion for improvement"",
    ""Another helpful suggestion""
  ]
}}

**Evaluation Guidelines:**
- Score 0.9-1.0: Excellent - Near perfect grammar, spelling, and meaning
- Score 0.7-0.89: Good - Minor errors, meaning is clear
- Score 0.5-0.69: Needs improvement - Several errors but basic meaning understood
- Score 0.3-0.49: Poor - Many errors, meaning unclear
- Score 0.0-0.29: Very poor - Barely comprehensible

**For corrections:**
- Only include actual spelling or grammar errors
- Format as [incorrect_word, correct_word] pairs
- Focus on the most important corrections

**For suggestions:**
- Provide 2-3 specific, actionable suggestions
- Focus on language learning aspects (vocabulary, grammar, sentence structure)
- Be encouraging and constructive

Respond ONLY with the JSON object, no additional text.";
    }

    private LlmEvaluationResult ParseGeminiResponse(string responseText)
    {
        try
        {
            // Clean the response text to extract JSON
            var jsonText = ExtractJsonFromResponse(responseText);

            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };

            var geminiResult = JsonSerializer.Deserialize<GeminiEvaluationResponse>(jsonText, options);

            if (geminiResult == null)
            {
                _logger.LogWarning("Failed to deserialize Gemini response: {Response}", responseText);
                return CreateFallbackResult();
            }

            return new LlmEvaluationResult
            {
                Score = Math.Clamp(geminiResult.Score, 0.0f, 1.0f),
                Corrections = geminiResult.Corrections ?? new List<List<string>>(),
                Suggestions = geminiResult.Suggestions ?? new List<string>()
            };
        }
        catch (JsonException ex)
        {
            _logger.LogError(ex, "Failed to parse Gemini response as JSON: {Response}", responseText);
            return CreateFallbackResult();
        }
    }

    private string ExtractJsonFromResponse(string responseText)
    {
        // Remove any markdown code blocks
        var cleaned = responseText.Trim();

        if (cleaned.StartsWith("```json"))
        {
            cleaned = cleaned.Substring(7);
        }
        else if (cleaned.StartsWith("```"))
        {
            cleaned = cleaned.Substring(3);
        }

        if (cleaned.EndsWith("```"))
        {
            cleaned = cleaned.Substring(0, cleaned.Length - 3);
        }

        return cleaned.Trim();
    }

    private LlmEvaluationResult CreateFallbackResult()
    {
        return new LlmEvaluationResult
        {
            Score = 0.5f,
            Corrections = new List<List<string>>(),
            Suggestions = new List<string>
            {
                "Unable to evaluate at this time. Please try again later.",
                "Consider reviewing your spelling and grammar."
            }
        };
    }

    private class GeminiEvaluationResponse
    {
        public float Score { get; set; }
        public List<List<string>>? Corrections { get; set; }
        public List<string>? Suggestions { get; set; }
    }
}
