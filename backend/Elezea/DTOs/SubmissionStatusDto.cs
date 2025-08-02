namespace Elezea.DTOs;

public class SubmissionStatusDto
{
    public int Id { get; set; }
    public bool IsEvaluated { get; set; }
    public float? Score { get; set; }
    public List<List<string>>? Corrections { get; set; }
    public List<string>? Suggestions { get; set; }
    public DateTime CreatedAt { get; set; }
}
