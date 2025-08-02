using Microsoft.EntityFrameworkCore;
using Elezea;
using Elezea.DTOs;
using Microsoft.AspNetCore.OpenApi;
using Microsoft.Extensions.Logging;

var builder = WebApplication.CreateBuilder(args);

// Configure logging
builder.Logging
    .AddConsole()
    .AddFilter("Microsoft.EntityFrameworkCore.Database.Command", LogLevel.Warning)
    .SetMinimumLevel(LogLevel.Information);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(options =>
    options.AddPolicy("AllowFrontend", policy =>
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod()));

var app = builder.Build();
app.UseCors("AllowFrontend");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

var api = app.MapGroup("/api");
var logger = app.Logger;

api.MapGet("images/random", async (AppDbContext context, string langCode = "en") =>
{
    try
    {
        // Get all valid IDs first (minimal data transfer)
        var validIds = await context.Descriptions
            .Include(d => d.Language)
            .Where(d => d.Language.Code == langCode)
            .Select(d => d.Id)
            .ToListAsync();

        if (validIds.Count == 0)
        {
            logger.LogWarning("No images found for language: {LangCode}", langCode);
            return Results.NotFound(new { Message = $"No images for {langCode}" });
        }

        // Select random ID in memory
        var randomIndex = new Random().Next(0, validIds.Count);
        var selectedId = validIds[randomIndex];

        // Get full image data
        var image = await context.Descriptions
            .Include(d => d.Image)
            .Include(d => d.Language)
            .Where(d => d.Id == selectedId)
            .Select(d => new ImageDto
            {
                Id = d.Image.Id,
                Url = d.Image.Url,
                DescriptionText = d.Text,
                LanguageCode = d.Language.Code
            })
            .FirstAsync();

        logger.LogInformation("Served image {ImageId} (URL: {ImageUrl})", image.Id, image.Url);
        return Results.Ok(image);
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "Failed to fetch image for {LangCode}", langCode);
        return Results.Problem("Server error");
    }
})
.WithName("GetRandomImage")
.Produces<ImageDto>(StatusCodes.Status200OK)
.Produces(StatusCodes.Status404NotFound)
.Produces(StatusCodes.Status500InternalServerError)
.WithOpenApi();

app.Run();
