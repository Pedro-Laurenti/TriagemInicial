import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png'
import puppeteer from 'puppeteer'
import fs from 'fs'
import path, { dirname, join } from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (typeof process === 'undefined') {
    globalThis.process = {
        platform: '',
        env: {}
    };
}

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
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.handle('generate-pdf', async (event, formData) => {

    const labelMapping = {
        'DisciplinasReqPsicologia': 'Psicologia',
        'DisciplinasReqTerapiaOcupacional': 'Terapia Ocupacional',
        'DisciplinasReqFisioterapia': 'Fisioterapia',
        'DisciplinasReqMusicoterapia': 'Musicoterapia',
        'DisciplinasReqFonoaudiologia': 'Fonoaudiologia',
        'DisciplinasReqNeuropsicologia': 'Neuropsicologia',
        'DisciplinasReqPsicomotricidade': 'Psicomotricidade',

        'AcompanhamentosProPsicologia': 'Psicologia',
        'AcompanhamentosProFonoaudiologia': 'Fonoaudiologia',
        'AcompanhamentosProTerapiaOcupacional': 'Terapia Ocupacional',
        'AcompanhamentosProFisioterapia': 'Fisioterapia',
        'AcompanhamentosProNeuropsicologia': 'Neuropsicologia',
        'AcompanhamentosProPsicomotricidade': 'Psicomotricidade',
        'AcompanhamentosProMusicoterapia': 'Musicoterapia',
        'AcompanhamentosProNutricionista': 'Nutricionista',
        'AcompanhamentosProAvaliaçãoNeuropsicológica': 'Avaliação Neuropsicológica',
        'AcompanhamentosProGeneticista': 'Geneticista',
        'AcompanhamentosProPsiquiatra': 'Psiquiatra',
        'AcompanhamentosProDentista': 'Dentista',
    };

    try {
        const htmlTemplate = fs.readFileSync(
            path.join(__dirname, '../renderer/src/template.html'), 'utf-8'
        );

        const radioGroups = ['Radio1'];

        radioGroups.forEach(group => {
            Object.keys(formData).forEach(key => {
                if (key.startsWith(group)) {
                    formData[key] = formData[key] ? 'checked' : '';
                }
            });
        });

        // Construir strings de disciplinas e atividades
        let disciplinasContent = '';
        let acompanhamentosContent = '';

        for (const [key, value] of Object.entries(formData)) {
            if (key.startsWith('DisciplinasReq') && value) {
                const disciplinaName = labelMapping[key] || key.replace('DisciplinasReq', '');
                disciplinasContent += `<li>${disciplinaName}</li>`;
            }
            if (key.startsWith('AcompanhamentosPro') && value) {
                const acompanhamentosName = labelMapping[key] || key.replace('AcompanhamentosPro', '');
                acompanhamentosContent += `<li>${acompanhamentosName}</li>`;
            }
        }

        // Adicionar valores selecionados dos selects
        // const selectedGestacao = formData['selectedGestacao'] || '';
        // const selectedParto = formData['selectedParto'] || '';

        formData['disciplinasContent'] = `<ul>${disciplinasContent}</ul>`;
        formData['acompanhamentosContent'] = `<ul>${acompanhamentosContent}</ul>`;

        let htmlContent = htmlTemplate;

        for (const [key, value] of Object.entries(formData)) {
            const regex = new RegExp(`{{${key}}}`, 'g');
            htmlContent = htmlContent.replace(regex, value);
        }

        console.log('HTML Content:', htmlContent);

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

        const { filePath } = await dialog.showSaveDialog({
            title: 'Salvar PDF',
            defaultPath: path.join(app.getPath('documents'), 'output.pdf'),
            filters: [{ name: 'PDF Files', extensions: ['pdf'] }]
        });

        if (filePath) {
            await page.pdf({
                path: filePath,
                format: 'A4',
                printBackground: true,
                margin: { top: '5mm', bottom: '5mm', left: '5mm', right: '5mm' }
            });
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
