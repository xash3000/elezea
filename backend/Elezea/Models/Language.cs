using System;
using System.ComponentModel.DataAnnotations;

namespace Elezea.Models;

public class Language
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(4)]
    public required string Code { get; set; }

    [Required]
    [MaxLength(16)]
    public required string Name { get; set; }
}
