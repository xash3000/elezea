namespace Elezea.DTOs;

public class LlmEvaluationResult
{
    public float Score { get; set; }
    public List<List<string>> Corrections { get; set; } = new();
    public List<string> Suggestions { get; set; } = new();
}
