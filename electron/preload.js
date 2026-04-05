const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    pickFolder: () => ipcRenderer.invoke('pick-folder'),
    listPhotos: (dir) => ipcRenderer.invoke('list-photos', dir)
});
