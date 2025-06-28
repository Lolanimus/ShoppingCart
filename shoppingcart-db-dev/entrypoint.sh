#!/bin/bash

# Start the script to create the DB and user
/tmp/initscripts/configure-db.sh &

# Start SQL Server
/opt/mssql/bin/sqlservr
