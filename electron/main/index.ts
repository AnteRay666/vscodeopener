import { app, BrowserWindow } from 'electron'
import { createWindow } from './config/window'
import './config/env' // 确保环境变量初始化
import './ipc/file'
import { registerConfigIPC } from './ipc/config'

let win: BrowserWindow | null = null


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
        win = null
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.whenReady().then(() => {
    win = createWindow()
    registerConfigIPC()
    console.log('Main window created:', win.id)  // 使用 win，避免 TS6133
})
