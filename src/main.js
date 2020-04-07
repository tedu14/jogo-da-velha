const { app, BrowserWindow } = require('electron');
const path = require('path');
const isdev = require('electron-is-dev');
require('electron-reload');

const createWindow = () => {
    let win = new BrowserWindow({
        width: 400,
        height: 430,
        webPreferences: {
            nodeIntegration: true,
        }
    });

    win.loadURL(
        isdev ?
            'http://127.0.0.1:5500/src/' :
            `${path.resolve(__dirname, 'index.html')}`
    );
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
});