import { app, BrowserWindow } from 'electron'
import { createWindow } from './config/window'
import './config/env' // 确保环境变量初始化
import './ipc/file'
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
})
