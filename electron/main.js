const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

let photoDir = null;

function getExeDir() {
    // Portable exe: electron-builder sets this to the real directory
    if (process.env.PORTABLE_EXECUTABLE_DIR) {
        return process.env.PORTABLE_EXECUTABLE_DIR;
    }
    if (app.isPackaged) {
        return path.dirname(process.execPath);
    }
    // In dev mode, use the electron/ folder's parent (viewer/)
    return path.resolve(__dirname, '..');
}

function listPhotosInDir(dir) {
    if (!dir || !fs.existsSync(dir)) return [];
    return fs.readdirSync(dir)
        .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
        .sort()
        .map(f => ({
            name: f,
            url: 'file:///' + path.join(dir, f).replace(/\\/g, '/')
        }));
}

function createWindow() {
    const win = new BrowserWindow({
        width: 1280,
        height: 800,
        title: 'Galerie 360',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            webSecurity: false
        }
    });

    win.setMenuBarVisibility(false);
    win.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();
});

app.on('window-all-closed', () => { app.quit(); });

ipcMain.handle('check-exe-dir', () => {
    const dir = getExeDir();
    const photos = listPhotosInDir(dir);
    if (photos.length > 0) {
        photoDir = dir;
        return { dir, photos };
    }
    return null;
});

ipcMain.handle('pick-folder', async () => {
    const result = await dialog.showOpenDialog({
        properties: ['openDirectory'],
        title: 'Choisir le dossier de photos 360'
    });
    if (result.canceled) return null;
    photoDir = result.filePaths[0];
    return photoDir;
});

ipcMain.handle('list-photos', async (event, dirPath) => {
    const dir = dirPath || photoDir;
    return listPhotosInDir(dir);
});
