import { ipcMain, dialog } from 'electron'
import fs from 'fs'

ipcMain.handle('open-txt-file', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
        title: '选择一个文本文件',
        filters: [{ name: 'Text Files', extensions: ['txt'] }],
        properties: ['openFile'],
    })

    if (canceled || filePaths.length === 0) return null

    const filePath = filePaths[0]
    const content = fs.readFileSync(filePath, 'utf-8')

    return { path: filePath, content }
})
