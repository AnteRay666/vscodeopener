import { BrowserWindow } from 'electron'
import path from 'path'
import { __dirname, RENDERER_DIST, VITE_DEV_SERVER_URL } from '../config/env'

export function createWindow() {
    const win = new BrowserWindow({
        width: 1920,
        height: 1280,
        autoHideMenuBar: true,
        frame: false, // 隐藏原生窗口边框
        transparent: false,
        backgroundColor: '#0f172a',
        icon: path.join(process.env.VITE_PUBLIC!, 'electron-vite.svg'),
        webPreferences: {
            preload: path.join(__dirname, '../preload/index.mjs'), // ✅ 注意路径
            contextIsolation: true,
            nodeIntegration: false,  // ✅ 安全模式
        },
    })

    if (VITE_DEV_SERVER_URL) {
        win.loadURL(VITE_DEV_SERVER_URL)
    } else {
        win.loadFile(path.join(RENDERER_DIST, 'index.html'))
    }

    win.webContents.on('did-finish-load', () => {
        win.webContents.send('main-process-message', new Date().toLocaleString())
    })

    // 监听窗口最大化/还原事件，通知渲染进程
    win.on('maximize', () => {
        win.webContents.send('maximize-change', true)
    })

    win.on('unmaximize', () => {
        win.webContents.send('maximize-change', false)
    })

    return win
}
