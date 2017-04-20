const electron = require('electron')

const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

//require('./server');
require('electron-reload')(__dirname);
let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({width: 750, height: 600, resizable: false})
    //mainWindow.loadURL('http://localhost:3007');
    mainWindow.loadURL('file://' + __dirname + '/app/index.html');

    // Open the DevTools.
    mainWindow.webContents.openDevTools()
    mainWindow.on('close', function(event) {
        //mainWindow.webContents.session.clearStorageData()
    });
    mainWindow.on('closed', function() {
        mainWindow = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function() {
    if (mainWindow === null) {
        createWindow()
    }
})

exports.removeStorage = () => {
    mainWindow.webContents.session.clearStorageData()
}
