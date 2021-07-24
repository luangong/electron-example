// Modules to control application life and create native browser window
const path = require('path');
const {
  app, autoUpdater, dialog, BrowserWindow, ipcMain,
} = require('electron');

// eslint-disable-next-line spaced-comment
////////////////////////////////////////////////////////////////////////////////////////////////////
// Ensure only one instance of our app can be run
// https://www.electronjs.org/docs/api/app#apprequestsingleinstancelock

if (!app.requestSingleInstanceLock()) {
  app.quit();
}

let mainWindow = null;
// eslint-disable-next-line no-unused-vars
app.on('second-instance', (event, commandLine, workingDirectory) => {
  // Someone tried to run a second instance, we should focus our window.
  if (mainWindow !== null) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }
    mainWindow.focus();
  }
});

// eslint-disable-next-line spaced-comment
////////////////////////////////////////////////////////////////////////////////////////////////////

const createWindow = function createWindow() {
  // Create the browser window
  // https://www.electronjs.org/docs/api/browser-window#new-browserwindowoptions
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    // fullscreen: true,
    autoHideMenuBar: true,
    webPreferences: {
      // devTools: false,
      preload: path.join(__dirname, 'preload.js'),
      // Whether node integration is enabled. Default is false.
      nodeIntegration: true,
      // Whether to run Electron APIs and the specified preload script in a separate JavaScript
      // context. Defaults to `true`. The context that the preload script runs in will only have
      // access to its own dedicated `document` and `window` globals, as well as its own set of
      // JavaScript built-ins (Array, Object, JSON, etc.), which are all invisible to the loaded
      // content. The Electron API will only be available in the preload script and not the loaded
      // page.
      contextIsolation: false,
    },
  });

  // Load a remote URL
  // window.loadURL('https://github.com/');
  // window.loadURL('https://www.google.com/');

  // Load the index.html of the app
  window.loadFile('index.html');

  // Open the DevTools
  window.webContents.openDevTools();

  return window;
};

// This method will be called when Electron has finished initialization and is ready to create
// browser windows. Some APIs can only be used after this event occurs.
// Create the main window, load the rest of the app, etc...
app.whenReady().then(() => {
  mainWindow = createWindow();
  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the dock icon is clicked and there
    // are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      mainWindow = createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// eslint-disable-next-line spaced-comment
////////////////////////////////////////////////////////////////////////////////////////////////////
// Command-line options
// https://www.electronjs.org/docs/api/command-line-switches

app.commandLine.appendSwitch('js-flags', '--max-old-space-size=2048 --expose-gc');

// eslint-disable-next-line spaced-comment
////////////////////////////////////////////////////////////////////////////////////////////////////
// Updating Applications
// https://www.electronjs.org/docs/tutorial/updates

const server = 'https://your-deployment-url.com';

autoUpdater.setFeedURL({
  url: `${server}/update/${process.platform}/${app.getVersion()}`,
});

// Check for updates every hour
setInterval(() => autoUpdater.checkForUpdates(), 60 * 60 * 1000);

// Ensure that the user will get notified when there's an update
autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Restart', 'Later'],
    title: 'Application Update',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail: 'A new version has been downloaded. Restart the application to apply the updates.',
  };

  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) {
      autoUpdater.quitAndInstall();
    }
  });
});

// Make sure that errors are being handled
autoUpdater.on('error', (message) => {
  console.error('There was a problem updating the application');
  console.error(message);
});

// eslint-disable-next-line spaced-comment
////////////////////////////////////////////////////////////////////////////////////////////////////
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// eslint-disable-next-line no-unused-vars
ipcMain.on('greet', (event) => {
  console.log('Received greeting from browser window!');
});
