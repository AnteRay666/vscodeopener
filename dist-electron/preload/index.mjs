"use strict";
const electron = require("electron");
const api = {
  // 通用 ipc 调用（可选保留）
  invoke: (channel, ...args) => electron.ipcRenderer.invoke(channel, ...args),
  // 🔹 打开文本文件
  openTxtFile: async () => {
    const result = await electron.ipcRenderer.invoke("open-txt-file");
    return result;
  },
  // 读写用户配置
  readUserConfig: () => electron.ipcRenderer.invoke("read-user-config"),
  writeUserConfig: (data) => electron.ipcRenderer.invoke("write-user-config", data),
  getProjectList: () => electron.ipcRenderer.invoke("get-project-list"),
  addProject: (project) => electron.ipcRenderer.invoke("add-project", project),
  openFolderDialog: () => electron.ipcRenderer.invoke("open-folder-dialog"),
  // 🔹 打开 VSCode
  openInVscode: (projectPath) => electron.ipcRenderer.invoke("open-in-vscode", projectPath),
  // 🔹 在资源管理器中打开
  openInExplorer: (projectPath) => electron.ipcRenderer.invoke("open-in-explorer", projectPath),
  // 🔹 更新项目
  updateProject: (oldPath, updatedProject) => electron.ipcRenderer.invoke("update-project", oldPath, updatedProject),
  // 🔹 删除项目
  deleteProject: (projectPath) => electron.ipcRenderer.invoke("delete-project", projectPath)
};
electron.contextBridge.exposeInMainWorld("electronAPI", api);
