using System;
using System.ComponentModel.DataAnnotations;

namespace Elezea.Models;

public class Image
{
    [Key]
    public int Id { get; set; }

    [Required]
    public required string Url { get; set; }
}
