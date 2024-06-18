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

app
    .whenReady()
    .then(() => {
        electronApp.setAppUserModelId('com.electron');
        app.on('browser-window-created', (_, window) => {
            optimizer.watchWindowShortcuts(window);
        });

        ipcMain.on('ping', () => console.log('pong'));

        // Função para gerar o PDF usando Puppeteer
        ipcMain.on('generate-pdf', async(event, formData) => {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();

            await page.setContent(`
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Formulário de Exemplo</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                    }
                    .wrapper{
                        width: 80%;
                        background-color: #f4f4f4;
                        display: flex;
                        align-items: center;
                    }
                    .form-container {
                        background-color: #fff;
                        padding: 20px;
                        border-radius: 5px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        width: 100%;
                        display: flex;
                        flex-direction: column;

                    }
                    .form-container h1 {
                        margin-bottom: 20px;
                        font-size: 24px;
                    }
                    .form-container label {
                        display: block;
                        margin-bottom: 5px;
                    }
                    .form-container input, .form-container textarea {
                        width: auto;
                        padding: 10px;
                        margin-bottom: 10px;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                    }
                </style>
            </head>
            <body>
                <div class="wrapper">
                    <div class="form-container">
                        <h1>Formulário de Exemplo</h1>
                        <label for="name">Nome:</label>
                        <input type="text" id="name" name="name" value="${formData.name}">
                        <label for="nomePaciente">nomePaciente:</label>
                        <input type="email" id="nomePaciente" name="nomePaciente" value="${formData.nomePaciente}">
                    </div>
                </div>
            </body>
            </html>
        `);

            const pdfPath = join(app.getPath('documents'), 'formulario.pdf');
            await page.pdf({path: pdfPath, format: 'A4'});

            await browser.close();

            event.reply('pdf-generated', pdfPath);
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