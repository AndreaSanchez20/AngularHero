using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddCors(options => {
    options.AddPolicy("CorsPolicy", builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

builder.Services.AddDbContext<HeroeDbContext>(options => options.UseSqlServer("Server=sql5102.site4now.net;Database=db_a8b94b_xcomar;User Id=db_a8b94b_xcomar_admin;Password=Logic123;"));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseCors("CorsPolicy");

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast =  Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");


var heroes = new List<Hero>
{
    new Hero { id = 12, name = "Dr. Nice" },
    new Hero { id = 13, name = "Bombasto" },
    new Hero { id = 14, name = "Celeritas" },
    new Hero { id = 15, name = "Magneta" },
    new Hero { id = 16, name = "RubberMan" },
    new Hero { id = 17, name = "Dynama" },
    new Hero { id = 18, name = "Dr. IQ" },
    new Hero { id = 19, name = "Magma" },
    new Hero { id = 20, name = "Tornado" }
};

app.MapGet("/getheroes", async (HeroeDbContext context) =>
{
    var listOfHeroes = await context.Heroes.ToListAsync();
    var listOfHeroes2 = await context.Heroes.ToListAsync();
    return listOfHeroes;
})
.WithName("GetHeroes");

app.MapGet("/getcities", (HeroeDbContext context) =>
{
    var listOfCities = context.Cities.ToList();
    return listOfCities;
})
.WithName("GetCities");

app.MapPost("/add-hero", async (Hero newHero, HeroeDbContext context) =>
{
    context.Heroes.Add(newHero);
    await context.SaveChangesAsync();
    return newHero;
}).WithName("AddHero");

app.MapPut("/update-hero/{id}", async (int id, Hero newHero, HeroeDbContext context) =>
{
    //Find the existing hero by ID
    var hero = await context.Heroes.FindAsync(id);
    if(hero==null){
        return Results.NotFound(new {message = "Hero not found"});
    }
    //update hero
    hero.name = newHero.name;
    await context.SaveChangesAsync();
    return Results.Ok(newHero);
}).WithName("UpdateHero");

app.MapDelete("/delete-hero/{id}", async (int id, HeroeDbContext context) =>
{
    var hero = await context.Heroes.FindAsync(id);

    if(hero == null){
        return Results.NotFound(new {message = "Hero not found"});
    }
    context.Heroes.Remove(hero);
    await context.SaveChangesAsync();
    return Results.Ok(new {message = "Hero eliminated"});
});

app.MapGet("/gethero/{id}", async (int id, HeroeDbContext context) =>
{
    var hero = await context.Heroes.FindAsync(id);

    if(hero == null){
        return Results.NotFound(new {message = "Hero not found"});
    }

    return Results.Ok(hero);
})
.WithName("GetHero");

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
