import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import template from './template.html'

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 900,
        height: 670,
        show: false,
        autoHideMenuBar: true,
        fullscreen: true,
        ...(process.platform === 'linux' ? { icon } : {}),
        webPreferences: {
            preload: join(__dirname, '../preload/index.js'),
            sandbox: false
        }
    });

    mainWindow.on('ready-to-show', () => {
        mainWindow.show();
    });

    mainWindow.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url);
        return { action: 'deny' };
    });

    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
    } else {
        mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
    }
}

app.whenReady().then(() => {
    electronApp.setAppUserModelId('com.electron');
    app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window);
    });
    createWindow();
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

ipcMain.handle('generate-pdf', async (event, formData) => {
    try {
        const htmlTemplate = fs.readFileSync(path.join(__dirname, './src/main/template.html'), 'utf-8');

        const radioGroups = ['Radio1', 'Radio2'];

        radioGroups.forEach(group => {
            Object.keys(formData).forEach(key => {
                if (key.startsWith(group)) {
                    formData[key] = formData[key] ? 'checked' : '';
                }
            });
        });

        let htmlContent = htmlTemplate;
        for (const [key, value] of Object.entries(formData)) {
            const regex = new RegExp(`{{${key}}}`, 'g');
            htmlContent = htmlContent.replace(regex, value);
        }

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(htmlContent);

        const { filePath } = await dialog.showSaveDialog({
            title: 'Salvar PDF',
            defaultPath: path.join(app.getPath('documents'), 'output.pdf'),
            filters: [{ name: 'PDF Files', extensions: ['pdf'] }]
        });

        if (filePath) {
            await page.pdf({ path: filePath, format: 'A4' });
            await browser.close();
            return `PDF salvo em: ${filePath}`;
        } else {
            await browser.close();
            return 'Salvamento cancelado';
        }
    } catch (error) {
        console.error('Erro ao gerar PDF:', error);
        throw new Error('Erro ao gerar PDF');
    }
});