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
}

// ---- 暴露到前端 ----
contextBridge.exposeInMainWorld('electronAPI', api)



