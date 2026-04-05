#!/bin/bash
# Rsync photos and confidential config to googlevm
# Run from the viewer/ directory

REMOTE="googlevm"
REMOTE_DIR="/opt/viewer-360"

echo "=== Syncing photo directories ==="
rsync -avz --progress \
    Photos-360-Lisa-Damien-4-Avril/ \
    "$REMOTE:$REMOTE_DIR/Photos-360-Lisa-Damien-4-Avril/"

echo "=== Syncing confidential user config ==="
rsync -avz --progress \
    users-config.js \
    "$REMOTE:$REMOTE_DIR/users-config.js"

echo "=== Done ==="
