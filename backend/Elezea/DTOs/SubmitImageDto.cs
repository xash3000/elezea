using System.ComponentModel.DataAnnotations;

namespace Elezea.DTOs;

public class SubmitImageDto
{
    [Required]
    public int ImageId { get; set; }

    [Required]
    [StringLength(10)]
    public required string LangCode { get; set; }

    [Required]
    [StringLength(1000)]
    public required string UserDescription { get; set; }
}
