let { shell } = require('@electron/remote')

let aHref = document.getElementById('aHref')

aHref.onclick = function (e) {
  e.preventDefalut()
  let href = this.getAttribute('href')
  shell.openExternal(href)
}