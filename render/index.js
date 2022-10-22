var fs = require('fs')
const BrowserWindow = require('@electron/remote').BrowserWindow

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
}