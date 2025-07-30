using System;

namespace Elezea.DTOs;

public class ImageDto
{
    public int Id { get; set; }
    public required string Url { get; set; }
    public required string DescriptionText { get; set; }
    public required string LanguageCode { get; set; }
}
