const { contextBridge, ipcRenderer, dialog } = require("electron");

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  // ipcRenderer.invoke相当于声明一个变量
  ping: () => ipcRenderer.invoke("ping"),
  //   能暴露的不仅仅是函数，还可以暴露变量
  desktop: true,
  doAThing: () => {
    console.log("明天吃火锅！");
  },
  setTitle: (title) => ipcRenderer.send("set-title", title),
  openFile: () => ipcRenderer.invoke("dialog:openFile"),
  handleCounter: (callback) => ipcRenderer.on("update-counter", callback),
});
