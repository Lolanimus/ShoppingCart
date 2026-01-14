//using StackExchange.Redis;

using Store.Infrastracture;
using Store.Infrastracture.Services.Cookies;
using Store.Infrastracture.Services.Cookies.Authentication;
using Store.Infrastracture.Services.Cookies.CartProducts;
using Store.Infrastracture.Services.Cookies.Token;
using Store.Infrastracture.Services.Cookies.UserInteractor;
using Microsoft.EntityFrameworkCore;

try
{
    DotNetEnv.Env.Load();
}
catch (FileNotFoundException)
{
    // .env file not found, environment variables should be set via docker-compose or system env
}

var connectionString = Environment.GetEnvironmentVariable("ConnectionStrings__DefaultConnection");
var containerPort = Environment.GetEnvironmentVariable("CONTAINER_APP_PORT");
var aspNetCoreEnv = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
var baseServerName = Environment.GetEnvironmentVariable("BASE_SERVER_NAME");
var frontEndPort = Environment.GetEnvironmentVariable("FRONTEND_P");
var clientUrl = aspNetCoreEnv == "Development"
    ? $"http://{baseServerName}:{frontEndPort}"
    : $"https://{baseServerName}";

Console.WriteLine($"DEBUG: The connection string is: {connectionString}");
Console.WriteLine($"DEBUG: The client URL is: {clientUrl}");

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(int.Parse(containerPort!));
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("cors", policy =>
    {
        policy.WithOrigins(clientUrl).AllowAnyHeader().AllowAnyMethod().AllowCredentials();
    });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// Add DbContext with PostgreSQL connection
if (!string.IsNullOrEmpty(connectionString))
{
    builder.Services.AddDbContext<StoreContext>(options =>
        options.UseNpgsql(connectionString)
               .UseLazyLoadingProxies());
}

builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<CookiesService>();
builder.Services.AddScoped<CartProductsService>();
builder.Services.AddScoped<TokenService>();
builder.Services.AddScoped<AuthenticationService>();
builder.Services.AddScoped<IUserInteractor>(serviceProvider =>
{
    var authService = serviceProvider.GetRequiredService<AuthenticationService>();
    var cartProductService = serviceProvider.GetRequiredService<CartProductsService>();

    return authService.IsUserLoggedIn() 
        ? new RegisteredUserInteractor(cartProductService) 
        : new GuestInteractor(cartProductService);
});

//var redisConnectionString = Environment.GetEnvironmentVariable("REDIS_CONNECTION_STRING");

// Redis cache
//builder.Services.AddSingleton<IConnectionMultiplexer>(ConnectionMultiplexer.Connect(redisConnectionString!));
//builder.Services.AddHttpClient();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("cors");

app.UseAuthorization();

app.UseHsts();

app.MapControllers();

app.Run();
