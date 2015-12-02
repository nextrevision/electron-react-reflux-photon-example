'use strict';
const electron = require('electron');
const app = electron.app;

var devHelper = require('./vendor/dev_helper');

//test
// report crashes to the Electron project
require('crash-reporter').start();

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window being garbage collected
let mainWindow;

function onClosed() {
  // dereference the window
  // for multiple windows store them in an array
  mainWindow = null;
}

function createMainWindow() {
  const win = new electron.BrowserWindow({
    width: 1200,
    height: 800,
    'min-width': 800,
    'min-height': 600,
    'accept-first-mouse': true,
    'title-bar-style': 'hidden'
  });

  win.loadURL(`file://${__dirname}/index.html`);
  win.on('closed', onClosed);

  return win;
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate-with-no-open-windows', () => {
  if (!mainWindow) {
    mainWindow = createMainWindow();
  }
});

app.on('ready', () => {
  mainWindow = createMainWindow();
  if (process.env.ENVIRONMENT === 'development') {
    devHelper.setDevMenu();
    mainWindow.openDevTools();
  }
});
