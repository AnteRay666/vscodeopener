import { ipcMain, dialog, app } from 'electron'
import fs from 'fs'
import path from 'path'
// 第一个测试ipc，能够选择一个txt文件并打开它，读取它的内容，并配合前端将内容展示出来。
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

ipcMain.handle('open-folder-dialog', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
        title: '选择一个文件夹',
        properties: ['openDirectory'],
    })

    if (canceled || filePaths.length === 0) return undefined

    return filePaths[0]
})

const projectListPath = path.join(app.getPath('userData'), 'projectlist.json')

ipcMain.handle('get-project-list', async () => {
    try {
        if (fs.existsSync(projectListPath)) {
            const data = fs.readFileSync(projectListPath, 'utf-8')
            return JSON.parse(data)
        }
        return []
    } catch (error) {
        console.error('Failed to read project list:', error)
        return []
    }
})

ipcMain.handle('add-project', async (_, project) => {
    try {
        let projects = []
        if (fs.existsSync(projectListPath)) {
            const data = fs.readFileSync(projectListPath, 'utf-8')
            projects = JSON.parse(data)
        }
        projects.push(project)
        fs.writeFileSync(projectListPath, JSON.stringify(projects, null, 2))
    } catch (error) {
        console.error('Failed to add project:', error)
    }
})


ipcMain.handle('open-json-file', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
        title: '选择一个Json文件',
        filters: [{ name: 'Json Files', extensions: ['json'] }],
        properties: ['openFile'],
    })

    if (canceled || filePaths.length === 0) return null

    const filePath = filePaths[0]
    const content = fs.readFileSync(filePath, 'utf-8')

    return { path: filePath, content }
})