#!/bin/sh
set -e

# Fix permissions AND ownership on the SSL key
chown postgres:postgres /etc/postgresql/server.key
chmod 600 /etc/postgresql/server.key
chmod 644 /etc/postgresql/server.crt

# Start Postgres with custom config
exec docker-entrypoint.sh postgres -c config_file=/etc/postgresql/postgresql.conf
