import {contextBridge, ipcRenderer} from 'electron';
import {electronAPI} from '@electron-toolkit/preload';

// Adicionando a funcionalidade de geração de PDF ao `api`
const api = {
    generatePdf: (formData) => ipcRenderer.send('generate-pdf', formData),
    onPdfGenerated: (callback) => ipcRenderer.on('pdf-generated', (event, filePath) => callback(filePath))
};

if (process.contextIsolated) {
    try {
        contextBridge.exposeInMainWorld('electron', electronAPI);
        contextBridge.exposeInMainWorld('api', api);
    } catch (error) {
        console.error(error);
    }
} else {
    window.electron = electronAPI;
    window.api = api;
}
