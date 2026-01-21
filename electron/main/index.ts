import { app, BrowserWindow } from 'electron'
import { createWindow, saveWindowConfig } from './config/window'
import './config/env' // 确保环境变量初始化
import './ipc/file'
import { registerConfigIPC } from './ipc/config'
import { registerWindowIPC } from './ipc/window'

let win: BrowserWindow | null = null

// 在应用退出前保存窗口大小
app.on('before-quit', () => {
    if (win && !win.isDestroyed()) {
        const bounds = win.getBounds()
        saveWindowConfig({ width: bounds.width, height: bounds.height })
    }
})

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
    registerWindowIPC()
    //  console.log('Main window created:', win.id)  // 使用 win，避免 TS6133
})
