/* eslint-env browser, node */
const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#button').addEventListener('click', () => {
    // ipcRenderer.invoke(channel, ...args) -> Promise<any>;
    // ipcRenderer.postMessage(channel, message, [transfer]);
    // ipcRenderer.sendTo(webContentsId, channel, ...args);
    // ipcRenderer.sendToHost(channel, ...args);
    ipcRenderer.send('greet', 'hello');
  });
});

// https://stackoverflow.com/questions/56393880/how-do-i-detect-dark-mode-using-javascript
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
  const newColorScheme = event.matches ? 'dark' : 'light';
  console.log(newColorScheme);
});
