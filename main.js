const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });
  // 设置监视器
  function handleSetTitle(event, title) {
    const webContents = event.sender;
    const win = BrowserWindow.fromWebContents(webContents);
    win.setTitle(title);
  }
  ipcMain.handle("ping", () => "pong");
  win.loadFile("index.html");
};

app.whenReady().then(() => {
  ipcMain.on("set-title", handleSetTitle);
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});
app.on("window-all-closed", () => {
  console.log("浏览器已关闭");
  if (process.platform !== "darwin") app.quit();
});
