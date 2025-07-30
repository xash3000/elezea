using Microsoft.EntityFrameworkCore;
using Elezea;
using Elezea.DTOs;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

var api = app.MapGroup("/api");

api.MapGet("images/random", async (AppDbContext context, string langCode = "en") =>
{
    return await context.Descriptions
    .Include(d => d.Image)
    .Include(d => d.Language)
    .Where(d => d.Language.Code == langCode)
    .OrderBy(d => EF.Functions.Random())
    .Select(d => new ImageDto
    {
        Id = d.Image.Id,
        Url = d.Image.Url,
        DescriptionText = d.Text,
        LanguageCode = d.Language.Code
    })
    .FirstOrDefaultAsync();

});

app.Run();
