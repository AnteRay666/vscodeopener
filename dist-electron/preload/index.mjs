"use strict";
const electron = require("electron");
const api = {
  // 通用 ipc 调用（可选保留）
  invoke: (channel, ...args) => electron.ipcRenderer.invoke(channel, ...args),
  // 🔹 打开文本文件
  openTxtFile: async () => {
    const result = await electron.ipcRenderer.invoke("open-txt-file");
    return result;
  }
};
electron.contextBridge.exposeInMainWorld("electronAPI", api);
