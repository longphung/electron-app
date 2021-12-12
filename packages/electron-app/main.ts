const {app, BrowserWindow} = require('electron')
const path = require("path")

console.log(process.env.NODE_ENV)

const isNotProduction = process.env.NODE_ENV !== "production"

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadURL(
        isNotProduction ? "http://localhost:3000" : `file://${path.join(__dirname, '../dist/index.html')}`
    )
    win.webContents.openDevTools()
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
