using Microsoft.EntityFrameworkCore;
using Elezea.Models;

namespace Elezea;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions options) : base(options) { }

    public DbSet<Image> Images { get; set; }
    public DbSet<Language> Languages { get; set; }
    public DbSet<Description> Descriptions { get; set; }
    public DbSet<Submission> Submissions { get; set; }
}
