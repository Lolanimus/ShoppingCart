using StackExchange.Redis;
using System;

var redis_url = Environment.GetEnvironmentVariable("SHOPPING_CART_REDIS_URL");
var redis_port = Environment.GetEnvironmentVariable("SHOPPING_CART_REDIS_PORT");
var redis_username = Environment.GetEnvironmentVariable("SHOPPING_CART_REDIS_USERNAME");
var redis_password = Environment.GetEnvironmentVariable("SHOPPING_CART_REDIS_PASSWORD");

var redis = ConnectionMultiplexer.Connect(
            new ConfigurationOptions{
                EndPoints= { {redis_url, redis_port} },
                User=redis_username,
                Password=redis_password
            }
        );

var StoreDb = redis.GetDatabase();
db.StringSet("foo", "bar");
RedisValue result = db.StringGet("foo");
Console.WriteLine(result); // >>> bar