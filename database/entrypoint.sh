#!/bin/sh

# Fix permissions AND ownership on the SSL key
chown postgres:postgres /etc/postgresql/server.key
chmod 600 /etc/postgresql/server.key

# Start Postgres with custom config
exec docker-entrypoint.sh postgres -c config_file=/etc/postgresql/postgresql.conf
