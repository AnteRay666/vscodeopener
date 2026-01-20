import { contextBridge, ipcRenderer } from 'electron'

// ---- 简洁封装 API ----
const api = {
    // 通用 ipc 调用（可选保留）
    invoke: (channel: string, ...args: any[]) => ipcRenderer.invoke(channel, ...args),

    // 🔹 打开文本文件
    openTxtFile: async () => {
        const result = await ipcRenderer.invoke('open-txt-file')
        return result // { path, content } 或 null
    },

    // 读写用户配置
    readUserConfig: () => ipcRenderer.invoke('read-user-config'),
    writeUserConfig: (data: any) => ipcRenderer.invoke('write-user-config', data),
    getProjectList: () => ipcRenderer.invoke('get-project-list'),
    addProject: (project: any) => ipcRenderer.invoke('add-project', project),
    openFolderDialog: () => ipcRenderer.invoke('open-folder-dialog'),

    // 🔹 打开 VSCode
    openInVscode: (projectPath: string) => ipcRenderer.invoke('open-in-vscode', projectPath),

    // 🔹 在资源管理器中打开
    openInExplorer: (projectPath: string) => ipcRenderer.invoke('open-in-explorer', projectPath),

    // 🔹 更新项目
    updateProject: (oldPath: string, updatedProject: any) => ipcRenderer.invoke('update-project', oldPath, updatedProject),

    // 🔹 删除项目
    deleteProject: (projectPath: string) => ipcRenderer.invoke('delete-project', projectPath),
}

// ---- 暴露到前端 ----
contextBridge.exposeInMainWorld('electronAPI', api)



