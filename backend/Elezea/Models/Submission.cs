using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Elezea.Models;

public class Submission
{
    [Key]
    public int Id { get; set; }

    [Required]
    public required string Description { get; set; }
    public float? Score { get; set; }
    public string? Feedback { get; set; }
    public DateTime CreatedAt { get; set; }

    [ForeignKey("Image")]
    public int ImageId { get; set; }
    public required Image Image { get; set; }

    [ForeignKey("Language")]
    public int LanguageId { get; set; }
    public required Language Language { get; set; }
}
