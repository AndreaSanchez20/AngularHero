using Microsoft.EntityFrameworkCore;

public class HeroeDbContext : DbContext {
    public HeroeDbContext(DbContextOptions<HeroeDbContext> options) : base(options) {}

    public DbSet<Hero> Heroes { get; set; }
}