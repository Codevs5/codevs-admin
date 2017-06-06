const electron = require('electron')

const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

const ipcMain = electron.ipcMain;

//require('./server');
require('electron-reload')(__dirname);
let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({width: 750, height: 800, resizable: false})
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

ipcMain.on('loadNewWin', (event, data) => {

  var currentWin = new BrowserWindow({ width: 800, height: 600 });
  currentWin.postId = data.id;
  currentWin.loadURL('file://' + __dirname + '/app/editor.html');
  currentWin.webContents.openDevTools();

});
