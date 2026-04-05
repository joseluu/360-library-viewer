#!/bin/bash
# Run on googlevm to set up the viewer
# Usage: ssh googlevm 'bash -s' < deploy/setup-remote.sh

set -e
REMOTE_DIR="/opt/viewer-360"

echo "=== Cloning repo ==="
sudo mkdir -p "$REMOTE_DIR"
sudo chown "$USER:$USER" "$REMOTE_DIR"
git clone https://github.com/joseluu/360-library-viewer.git "$REMOTE_DIR"

echo "=== Installing supervisor config ==="
sudo cp "$REMOTE_DIR/deploy/viewer-360.supervisor.conf" /etc/supervisor/conf.d/viewer-360.conf
sudo supervisorctl reread
sudo supervisorctl update

echo "=== Installing nginx config ==="
sudo cp "$REMOTE_DIR/deploy/nginx-viewer-360.conf" /etc/nginx/sites-available/viewer-360
sudo ln -sf /etc/nginx/sites-available/viewer-360 /etc/nginx/sites-enabled/viewer-360
sudo nginx -t && sudo systemctl reload nginx

echo "=== Starting service ==="
sudo supervisorctl start viewer-360

echo "=== Setup complete ==="
echo "Site will be available at http://viewer-360.duckdns.org"
echo "Now run rsync-deploy.sh locally to push photos and users-config.js"
