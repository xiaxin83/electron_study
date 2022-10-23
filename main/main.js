let { Menu,BrowserWindow } = require('electron')
let template = [
  {
    label: '凤来怡洗浴会所',
    submenu: [
      {
        label: '精品SPA',
        accelerator:'ctrl+n',
        click: () => {
          let win = new BrowserWindow({
            width: 500,
            height: 500,
            webPreferences: {nodeIntegration:true,contextIsolation: false,enableRemoteModule:true }
          })
          win.loadFile('newpage.html')
          win.on('closed', () => {
            win = null
          })
        }
      },
      {
        label: '泰式按摩',
      }
     ]
  },
  {
    label: '大浪淘沙洗浴中心',
    submenu: [
      {
        label: '牛奶玫瑰浴',
      },
      {
        label: '爱情拍拍手',
      }
    ]
  }
]

let m = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(m)