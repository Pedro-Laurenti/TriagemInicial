import {app, shell, BrowserWindow, ipcMain} from 'electron';
import {join} from 'path';
import {electronApp, optimizer, is} from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';
import puppeteer from 'puppeteer';

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 900,
        height: 670,
        show: false,
        autoHideMenuBar: true,
        fullscreen: true,
        ...(process.platform === 'linux'
            ? {
                icon
            }
            : {}),
        webPreferences: {
            preload: join(__dirname, '../preload/index.js'),
            sandbox: false
        }
    });

    mainWindow.on('ready-to-show', () => {
        mainWindow.show();
    });

    mainWindow
        .webContents
        .setWindowOpenHandler((details) => {
            shell.openExternal(details.url);
            return {action: 'deny'};
        });

    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
    } else {
        mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
    }
}

app .whenReady() .then(() => {
        electronApp.setAppUserModelId('com.electron');
        app.on('browser-window-created', (_, window) => {
            optimizer.watchWindowShortcuts(window);
        });
        createWindow();
        app.on('activate', function () {
            if (BrowserWindow.getAllWindows().length === 0) 
                createWindow();
            }
        );
    });

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

ipcMain.handle('generate-pdf', async (event, nome) => {
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
            
        </style>
    </head>
    <body>
        <div class="min-h-10 p-5 grid grid-cols-2 gap-8">
            <div class='bg-sky-500 p-5'>
                <div class="py-2 px-8 mb-4">
                    <label>
                        Nome do paciente: ${nome}
                        <input
                            class="border border-slate-300 rounded px-4 py-2 w-full text-slate-600 mb-6"
                            placeholder="Nome"
                            type="text"
                            value="${nome}"
                            readonly
                        />
                    </label>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    await page.pdf({ path: path.join(app.getPath('userData'), 'output.pdf'), format: 'A4' });
    await browser.close();
    
    return 'PDF gerado';
});
