namespace Elezea.Configuration;

public class GeminiAIOptions
{
    public const string SectionName = "GeminiAI";

    public string ApiKey { get; set; } = string.Empty;
    public string Model { get; set; } = "gemini-2.0-flash-exp";
}
