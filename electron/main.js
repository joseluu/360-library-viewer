const { app, BrowserWindow, ipcMain, dialog, protocol } = require('electron');
const path = require('path');
const fs = require('fs');

let photoDir = null;

function createWindow() {
    const win = new BrowserWindow({
        width: 1280,
        height: 800,
        title: 'Galerie 360',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.setMenuBarVisibility(false);
    win.loadFile('index.html');
}

app.whenReady().then(() => {
    // Register protocol to serve photo files from the chosen directory
    protocol.registerFileProtocol('photo', (request, callback) => {
        const filePath = decodeURIComponent(request.url.replace('photo://', ''));
        callback({ path: filePath });
    });

    createWindow();
});

app.on('window-all-closed', () => { app.quit(); });

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
    if (!dir) return [];
    const files = fs.readdirSync(dir)
        .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
        .sort();
    return files.map(f => ({
        name: f,
        url: 'photo://' + encodeURIComponent(path.join(dir, f).replace(/\\/g, '/'))
    }));
});
