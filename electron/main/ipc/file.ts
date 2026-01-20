import { ipcMain, dialog, app, shell } from 'electron'
import fs from 'fs'
import path from 'path'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)
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

ipcMain.handle('open-in-vscode', async (_, projectPath: string) => {
    try {
        // 使用 code 命令打开 VSCode
        await execAsync(`code "${projectPath}"`)
        return { success: true }
    } catch (error) {
        console.error('Failed to open VSCode:', error)
        return { success: false, error: String(error) }
    }
})

ipcMain.handle('open-in-explorer', async (_, projectPath: string) => {
    try {
        // 使用 shell.openPath 打开文件资源管理器
        await shell.openPath(projectPath)
        return { success: true }
    } catch (error) {
        console.error('Failed to open explorer:', error)
        return { success: false, error: String(error) }
    }
})

ipcMain.handle('update-project', async (_, oldPath: string, updatedProject: any) => {
    try {
        let projects = []
        if (fs.existsSync(projectListPath)) {
            const data = fs.readFileSync(projectListPath, 'utf-8')
            projects = JSON.parse(data)
        }
        // 找到并更新项目
        const index = projects.findIndex((p: any) => p.path === oldPath)
        if (index !== -1) {
            projects[index] = updatedProject
            fs.writeFileSync(projectListPath, JSON.stringify(projects, null, 2))
            return { success: true }
        }
        return { success: false, error: 'Project not found' }
    } catch (error) {
        console.error('Failed to update project:', error)
        return { success: false, error: String(error) }
    }
})

ipcMain.handle('delete-project', async (_, projectPath: string) => {
    try {
        let projects = []
        if (fs.existsSync(projectListPath)) {
            const data = fs.readFileSync(projectListPath, 'utf-8')
            projects = JSON.parse(data)
        }
        // 过滤掉要删除的项目
        projects = projects.filter((p: any) => p.path !== projectPath)
        fs.writeFileSync(projectListPath, JSON.stringify(projects, null, 2))
        return { success: true }
    } catch (error) {
        console.error('Failed to delete project:', error)
        return { success: false, error: String(error) }
    }
})