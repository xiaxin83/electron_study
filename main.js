let electron = require('electron')
let app = electron.app  //引用app
let BrowserWindow = electron.BrowserWindow   //窗口
let mainWindow = null  //打开的主窗口
let BrowserView = electron.BrowserView
app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {nodeIntegration:true,contextIsolation: false,enableRemoteModule:true }
  })
  require('./main/main')
  require("@electron/remote/main").initialize();
  require("@electron/remote/main").enable(mainWindow.webContents);
  let view = new BrowserView()
  mainWindow.setBrowserView(view)
  view.setBounds({ x: 0, y: 120, width: 1000, height: 680 })
  view.webContents.loadURL('https://electronjs.org')
  mainWindow.loadFile('index.html')
  mainWindow.openDevTools()
  mainWindow.on('close', () => {
    mainWindow = null

  })

})
