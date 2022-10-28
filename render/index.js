const { ipcRenderer } = require("electron");

const information = document.getElementById("info");
const setButton = document.getElementById("btn");
const titleInput = document.getElementById("title");
const openFile = document.getElementById("openFile");
const filePathElement = document.getElementById("filePath");
const counter = document.getElementById("counter");
const channel = new MessageChannel();

information.innerText = `本应用正在使用Chrome (V${versions.chrome()}),Node.js(V${versions.node()}),和Electron(V${versions.electron()})`;

const func = async () => {
  const response = await window.versions.ping();
  console.log(response);
};
func();
console.log(versions.doAThing());

setButton.addEventListener("click", () => {
  const title = titleInput.value;
  versions.setTitle(title);
});

openFile.addEventListener("click", async () => {
  const filePath = await versions.openFile();
  filePathElement.innerHTML = filePath;
});
versions.handleCounter((event, value) => {
  const oldValue = Number(counter.innerText);
  const newValue = oldValue + value;
  if (newValue == 0) return;
  counter.innerText = newValue;
  event.sender.send("counter-value", newValue);
});

// -----------------
const port1 = channel.port1;
const port2 = channel.port2;

port2.postMessage({ answer: 42 });

ipcRenderer.postMessage("port", null, [port2]);
