let electron = require('electron')
let app = electron.app  //引用app
let BrowserWindow = electron.BrowserWindow   //窗口
let mainWindow = null  //打开的主窗口

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {nodeIntegration:true,contextIsolation: false,enableRemoteModule:true }
  })
  require("@electron/remote/main").initialize();
  require("@electron/remote/main").enable(mainWindow.webContents);
  mainWindow.loadFile('index.html')
  mainWindow.openDevTools()
  mainWindow.on('close', () => {
    mainWindow = null

  })

})
