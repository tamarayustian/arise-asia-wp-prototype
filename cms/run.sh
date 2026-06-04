#!/bin/bash
set -e
rm -f /etc/apache2/mods-enabled/mpm_event.* /etc/apache2/mods-enabled/mpm_worker.* 2>/dev/null || true
a2enmod mpm_prefork -q
exec docker-entrypoint.sh apache2-foreground
