const { app, BrowserWindow, ipcMain, Menu, dialog } = require("electron");
const path = require("path");

// 渲染器进程到主进程(单向)
function handleSetTitle(event, title) {
  const webContents = event.sender;
  const win = BrowserWindow.fromWebContents(webContents);
  win.setTitle(title);
}
// 渲染器进程到主进程(双向)
async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog();
  if (canceled) {
    return;
  } else {
    return filePaths[0];
  }
}
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      sandbox: true,
    },
  });

  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        {
          click: () => win.webContents.send("update-counter", 1),
          label: "Increment",
        },
        {
          click: () => win.webContents.send("update-counter", -1),
          label: "Decrement",
        },
      ],
    },
  ]);

  Menu.setApplicationMenu(menu);
  ipcMain.handle("ping", () => "pong");
  win.loadFile("index.html");
  win.webContents.openDevTools();
};

app.whenReady().then(() => {
  ipcMain.on("counter-value", (_event, value) => {
    console.log(value);
  });
  ipcMain.handle("dialog:openFile", handleFileOpen);
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
