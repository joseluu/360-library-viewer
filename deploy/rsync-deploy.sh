#!/bin/bash
# Push photos and confidential config to googlevm
# Run from the viewer/ directory

REMOTE="googlevm"
REMOTE_DIR="/home/jose_luu/360-library-viewer"

echo "=== Syncing photo directories ==="
scp -r Photos-360-Lisa-Damien-4-Avril "$REMOTE:$REMOTE_DIR/"

echo "=== Syncing confidential user config ==="
scp users-config.js "$REMOTE:$REMOTE_DIR/users-config.js"

echo "=== Done ==="
