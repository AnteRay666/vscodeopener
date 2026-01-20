import { ipcMain, BrowserWindow } from 'electron'

export function registerWindowIPC() {
    // 窗口控制
    ipcMain.on('window-control', (event, action: 'minimize' | 'maximize' | 'close') => {
        const win = BrowserWindow.fromWebContents(event.sender)
        if (!win) return

        switch (action) {
            case 'minimize':
                win.minimize()
                break
            case 'maximize':
                if (win.isMaximized()) {
                    win.unmaximize()
                } else {
                    win.maximize()
                }
                break
            case 'close':
                win.close()
                break
        }
    })

    // 监听窗口最大化状态变化
    ipcMain.on('get-maximize-state', (event) => {
        const win = BrowserWindow.fromWebContents(event.sender)
        if (win) {
            event.reply('maximize-change', win.isMaximized())
        }
    })
}
