using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Elezea.Models;

public class Description
{
    [Key]
    public int Id { get; set; }

    [Required]
    public required string Text { get; set; }

    [ForeignKey("Image")]
    public int ImageId { get; set; }
    public required Image Image { get; set; }

    [ForeignKey("Language")]
    public int LanguageId { get; set; }
    public required Language Language { get; set; }
}
