import { BrowserWindow } from 'electron'
import path from 'path'
import { __dirname, RENDERER_DIST, VITE_DEV_SERVER_URL } from '../config/env'
import { readConfig, updateConfig } from './configManager'

// 读取窗口配置
function loadWindowConfig() {
    const config = readConfig()
    if (config.windowBounds) {
        return config.windowBounds
    }
    // 默认窗口大小
    return { width: 1080, height: 720 }
}

// 保存窗口配置
export function saveWindowConfig(bounds: { width: number; height: number }) {
    const success = updateConfig({ windowBounds: bounds })
    if (success) {
        //  console.log('Window bounds saved:', bounds)
    } else {
        console.error('Failed to save window bounds')
    }
}

export function createWindow() {
    const windowConfig = loadWindowConfig()

    const win = new BrowserWindow({
        width: windowConfig.width,
        height: windowConfig.height,
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

    // 在窗口关闭时保存窗口大小
    win.on('close', () => {
        if (!win.isDestroyed()) {
            const bounds = win.getBounds()
            saveWindowConfig({ width: bounds.width, height: bounds.height })
        }
    })

    return win
}
