const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    checkExeDir: () => ipcRenderer.invoke('check-exe-dir'),
    pickFolder: () => ipcRenderer.invoke('pick-folder'),
    listPhotos: (dir) => ipcRenderer.invoke('list-photos', dir)
});
