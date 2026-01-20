import { BrowserWindow, ipcMain, dialog, app, shell } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { exec } from "child_process";
import { promisify } from "util";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const APP_ROOT = path.join(__dirname, "..", "..");
path.join(APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(APP_ROOT, "dist");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
process.env.APP_ROOT = APP_ROOT;
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(APP_ROOT, "public") : RENDERER_DIST;
function createWindow() {
  const win2 = new BrowserWindow({
    width: 1920,
    height: 1280,
    autoHideMenuBar: true,
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.mjs"),
      // ✅ 注意路径
      contextIsolation: true,
      nodeIntegration: false
      // ✅ 安全模式
    }
  });
  if (VITE_DEV_SERVER_URL) {
    win2.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win2.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
  win2.webContents.on("did-finish-load", () => {
    win2.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  return win2;
}
const execAsync = promisify(exec);
ipcMain.handle("open-txt-file", async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    title: "选择一个文本文件",
    filters: [{ name: "Text Files", extensions: ["txt"] }],
    properties: ["openFile"]
  });
  if (canceled || filePaths.length === 0) return null;
  const filePath = filePaths[0];
  const content = fs.readFileSync(filePath, "utf-8");
  return { path: filePath, content };
});
ipcMain.handle("open-folder-dialog", async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    title: "选择一个文件夹",
    properties: ["openDirectory"]
  });
  if (canceled || filePaths.length === 0) return void 0;
  return filePaths[0];
});
const projectListPath = path.join(app.getPath("userData"), "projectlist.json");
ipcMain.handle("get-project-list", async () => {
  try {
    if (fs.existsSync(projectListPath)) {
      const data = fs.readFileSync(projectListPath, "utf-8");
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error("Failed to read project list:", error);
    return [];
  }
});
ipcMain.handle("add-project", async (_, project) => {
  try {
    let projects = [];
    if (fs.existsSync(projectListPath)) {
      const data = fs.readFileSync(projectListPath, "utf-8");
      projects = JSON.parse(data);
    }
    projects.push(project);
    fs.writeFileSync(projectListPath, JSON.stringify(projects, null, 2));
  } catch (error) {
    console.error("Failed to add project:", error);
  }
});
ipcMain.handle("open-json-file", async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    title: "选择一个Json文件",
    filters: [{ name: "Json Files", extensions: ["json"] }],
    properties: ["openFile"]
  });
  if (canceled || filePaths.length === 0) return null;
  const filePath = filePaths[0];
  const content = fs.readFileSync(filePath, "utf-8");
  return { path: filePath, content };
});
ipcMain.handle("open-in-vscode", async (_, projectPath) => {
  try {
    await execAsync(`code "${projectPath}"`);
    return { success: true };
  } catch (error) {
    console.error("Failed to open VSCode:", error);
    return { success: false, error: String(error) };
  }
});
ipcMain.handle("open-in-explorer", async (_, projectPath) => {
  try {
    await shell.openPath(projectPath);
    return { success: true };
  } catch (error) {
    console.error("Failed to open explorer:", error);
    return { success: false, error: String(error) };
  }
});
ipcMain.handle("update-project", async (_, oldPath, updatedProject) => {
  try {
    let projects = [];
    if (fs.existsSync(projectListPath)) {
      const data = fs.readFileSync(projectListPath, "utf-8");
      projects = JSON.parse(data);
    }
    const index = projects.findIndex((p) => p.path === oldPath);
    if (index !== -1) {
      projects[index] = updatedProject;
      fs.writeFileSync(projectListPath, JSON.stringify(projects, null, 2));
      return { success: true };
    }
    return { success: false, error: "Project not found" };
  } catch (error) {
    console.error("Failed to update project:", error);
    return { success: false, error: String(error) };
  }
});
ipcMain.handle("delete-project", async (_, projectPath) => {
  try {
    let projects = [];
    if (fs.existsSync(projectListPath)) {
      const data = fs.readFileSync(projectListPath, "utf-8");
      projects = JSON.parse(data);
    }
    projects = projects.filter((p) => p.path !== projectPath);
    fs.writeFileSync(projectListPath, JSON.stringify(projects, null, 2));
    return { success: true };
  } catch (error) {
    console.error("Failed to delete project:", error);
    return { success: false, error: String(error) };
  }
});
const configFilePath = path.join(app.getPath("userData"), "VsCodeOpener", "user.json");
function registerConfigIPC() {
  ipcMain.handle("read-user-config", async () => {
    try {
      if (fs.existsSync(configFilePath)) {
        const data = await fs.promises.readFile(configFilePath, "utf-8");
        return JSON.parse(data);
      }
      return {};
    } catch (error) {
      console.error("Failed to read user config:", error);
      return {};
    }
  });
  ipcMain.handle("write-user-config", async (_, data) => {
    try {
      const dir = path.dirname(configFilePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      await fs.promises.writeFile(configFilePath, JSON.stringify(data, null, 2));
      return { success: true };
    } catch (error) {
      console.error("Failed to write user config:", error);
      return { success: false, error: error.message };
    }
  });
}
let win = null;
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
app.whenReady().then(() => {
  win = createWindow();
  registerConfigIPC();
  console.log("Main window created:", win.id);
});
