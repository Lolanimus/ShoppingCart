//using StackExchange.Redis;

using Store.Infrastracture.Services.Cookies;
using Store.Infrastracture.Services.Cookies.Authentication;
using Store.Infrastracture.Services.Cookies.CartProducts;
using Store.Infrastracture.Services.Cookies.Token;
using Store.Infrastracture.Services.Cookies.UserInteractor;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(int.Parse(Environment.GetEnvironmentVariable("CONTAINER_APP_PORT")!));
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("cors", policy =>
    {
        if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development")
            policy.WithOrigins($"http://{Environment.GetEnvironmentVariable("BASE_SERVER_NAME")}:{Environment.GetEnvironmentVariable("FRONTEND_P")}").AllowAnyHeader().AllowAnyMethod().AllowCredentials();
        else
            policy.WithOrigins($"https://{Environment.GetEnvironmentVariable("BASE_SERVER_NAME")}.com").AllowAnyHeader().AllowAnyMethod().AllowCredentials();
    });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
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
