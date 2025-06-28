#!/bin/bash

# Calls SQLCMD to verify that system and user databases return "0" which means all databases are in an "online" state,
# then run the configuration script (setup.sql)
# https://docs.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-databases-transact-sql?view=sql-server-2017 

sleep 15s

# Run the setup script to create the DB and the schema in the DB
echo "Running configuration script..."

/opt/mssql-tools18/bin/sqlcmd -S "tcp:localhost,1433" -U sa -P "$SA_PASSWORD" -d master -i tmp/initscripts/shoppingcart-db.sql -C

echo "Configuration completed."
