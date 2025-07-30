using System;
using System.ComponentModel.DataAnnotations;

namespace Elezea.Models;

public class Image
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(2048)]
    [Url]
    public required string Url { get; set; }
}
