# 360 Library Viewer

View 360 equirectangular photos (Samsung Gear 360 SM-C200) in an interactive panoramic viewer powered by [Pannellum](https://pannellum.org/).

## Web version

A hosted gallery at `viewer-360.duckdns.org`. Users log in with their first name (matched against an allow list). Each user is granted access to a specific photo directory for one year. After 2 failed attempts the browser is blocked via cookie.

### Deployment

The site runs on `googlevm` as a Python HTTP server managed by supervisorctl, behind nginx.

```bash
# First-time setup on the server
ssh googlevm 'bash -s' < deploy/setup-remote.sh

# Push photos and user config (git-ignored)
cd viewer/
bash deploy/rsync-deploy.sh

# Service management
ssh googlevm 'sudo supervisorctl restart viewer-360'
```

Configuration files (git-ignored, deployed via scp):
- `users-config.js` — user allow list and user-to-directory mapping
- `Photos-360-*/` — photo directories

## Desktop version (Electron)

A standalone Windows executable for local viewing. No login required. If photos (`.jpg`, `.jpeg`, `.png`) are present in the same folder as the executable, the gallery opens automatically. Otherwise a folder picker is shown.

### Build

```bash
cd electron/
npm install
npm run build        # produces dist/Galerie 360 1.0.0.exe (portable)
```

### Usage

Copy `Galerie 360 1.0.0.exe` into a folder containing 360 photos and run it.
