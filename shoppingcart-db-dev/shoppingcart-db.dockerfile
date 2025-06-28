FROM mcr.microsoft.com/mssql/server:2022-latest

USER root

# Create a config directory
RUN mkdir /tmp/initscripts

# Bundle config source
COPY . /tmp/initscripts

ENTRYPOINT ["/tmp/initscripts/entrypoint.sh"]