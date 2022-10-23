var fs = require('fs')
const { BrowserWindow, Menu,getCurrentWindow } = require('@electron/remote')
// const BrowserWindow = require('@electron/remote')

// console.log(BrowserWindow);
// const {remote} = require('electron')


window.onload = function () {
  let btn = document.getElementById("btn")
  let baby = document.getElementById("baby")
  let newpage = document.getElementById('newpage')
  btn.addEventListener('click', function () {
    console.log("1");
    fs.readFile('xiaojiejie.txt', (err, data) => {
      baby.innerHTML = data
    })
  })
  newpage.onclick = () => {
    newWin = new BrowserWindow({
      width: 500,
      height: 500,
    });

    newWin.loadFile("newpage.html");
    newWin.on("closed", () => {
      newWin = null;
    });
  };

  let rightTemplate = [
    {
      label: '粘贴',
    },
    {
      label: '复制',
    }
  ]
let m = Menu.buildFromTemplate(rightTemplate)
  window.addEventListener('contextmenu', function (e) {
    e.preventDefault()
    m.popup({window:getCurrentWindow()})
  })
}