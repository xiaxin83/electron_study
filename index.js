var fs = require('fs')
window.onload = function () {
  let btn = document.getElementById("btn")
  let baby = document.getElementById("baby")
  btn.addEventListener('click', function () {
    console.log("1");
    fs.readFile('xiaojiejie.txt', (err,data) => {
      baby.innerHTML = data
    })
  })
}