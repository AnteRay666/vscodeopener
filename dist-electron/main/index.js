import { BrowserWindow as h, ipcMain as i, dialog as f, app as s } from "electron";
import o from "path";
import { fileURLToPath as m } from "url";
import r from "fs";
const w = o.dirname(m(import.meta.url)), d = o.join(w, "..", "..");
o.join(d, "dist-electron");
const g = o.join(d, "dist"), p = process.env.VITE_DEV_SERVER_URL;
process.env.APP_ROOT = d;
process.env.VITE_PUBLIC = p ? o.join(d, "public") : g;
function y() {
  const e = new h({
    width: 1920,
    height: 1280,
    autoHideMenuBar: !0,
    icon: o.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: o.join(w, "../preload/index.mjs"),
      // ✅ 注意路径
      contextIsolation: !0,
      nodeIntegration: !1
      // ✅ 安全模式
    }
  });
  return p ? e.loadURL(p) : e.loadFile(o.join(g, "index.html")), e.webContents.on("did-finish-load", () => {
    e.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), e;
}
i.handle("open-txt-file", async () => {
  const { canceled: e, filePaths: n } = await f.showOpenDialog({
    title: "选择一个文本文件",
    filters: [{ name: "Text Files", extensions: ["txt"] }],
    properties: ["openFile"]
  });
  if (e || n.length === 0) return null;
  const t = n[0], a = r.readFileSync(t, "utf-8");
  return { path: t, content: a };
});
i.handle("open-folder-dialog", async () => {
  const { canceled: e, filePaths: n } = await f.showOpenDialog({
    title: "选择一个文件夹",
    properties: ["openDirectory"]
  });
  if (!(e || n.length === 0))
    return n[0];
});
const c = o.join(s.getPath("userData"), "projectlist.json");
i.handle("get-project-list", async () => {
  try {
    if (r.existsSync(c)) {
      const e = r.readFileSync(c, "utf-8");
      return JSON.parse(e);
    }
    return [];
  } catch (e) {
    return console.error("Failed to read project list:", e), [];
  }
});
i.handle("add-project", async (e, n) => {
  try {
    let t = [];
    if (r.existsSync(c)) {
      const a = r.readFileSync(c, "utf-8");
      t = JSON.parse(a);
    }
    t.push(n), r.writeFileSync(c, JSON.stringify(t, null, 2));
  } catch (t) {
    console.error("Failed to add project:", t);
  }
});
i.handle("open-json-file", async () => {
  const { canceled: e, filePaths: n } = await f.showOpenDialog({
    title: "选择一个Json文件",
    filters: [{ name: "Json Files", extensions: ["json"] }],
    properties: ["openFile"]
  });
  if (e || n.length === 0) return null;
  const t = n[0], a = r.readFileSync(t, "utf-8");
  return { path: t, content: a };
});
const l = o.join(s.getPath("userData"), "VsCodeOpener", "user.json");
function j() {
  i.handle("read-user-config", async () => {
    try {
      if (r.existsSync(l)) {
        const e = await r.promises.readFile(l, "utf-8");
        return JSON.parse(e);
      }
      return {};
    } catch (e) {
      return console.error("Failed to read user config:", e), {};
    }
  }), i.handle("write-user-config", async (e, n) => {
    try {
      const t = o.dirname(l);
      return r.existsSync(t) || r.mkdirSync(t, { recursive: !0 }), await r.promises.writeFile(l, JSON.stringify(n, null, 2)), { success: !0 };
    } catch (t) {
      return console.error("Failed to write user config:", t), { success: !1, error: t.message };
    }
  });
}
let u = null;
s.on("window-all-closed", () => {
  process.platform !== "darwin" && (s.quit(), u = null);
});
s.on("activate", () => {
  h.getAllWindows().length === 0 && y();
});
s.whenReady().then(() => {
  u = y(), j(), console.log("Main window created:", u.id);
});
