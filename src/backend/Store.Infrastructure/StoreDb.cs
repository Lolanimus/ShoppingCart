using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using StackExchange.Redis;

// Authenticate using Managed Identity or Azure Credential
var client = new SecretClient(new Uri(keyVaultUrl), new DefaultAzureCredential());

// Retrieve the secret from Azure Key Vault
KeyVaultSecret secret = await client.GetSecretAsync(secretName);
string redisConnectionString = secret.Value;

var muxer = ConnectionMultiplexer.Connect(
            new ConfigurationOptions{
                EndPoints= { {"redis-14623.c251.east-us-mz.azure.redns.redis-cloud.com", 14623} },
                User="default",
                Password="*******"
            }
        );

var StoreDb = muxer.GetDatabase();