import { BrowserWindow as d, ipcMain as i, dialog as h, app as c, shell as x } from "electron";
import s from "path";
import { fileURLToPath as j } from "url";
import t from "fs";
import { exec as F } from "child_process";
import { promisify as P } from "util";
const w = s.dirname(j(import.meta.url)), u = s.join(w, "..", "..");
s.join(u, "dist-electron");
const g = s.join(u, "dist"), p = process.env.VITE_DEV_SERVER_URL;
process.env.APP_ROOT = u;
process.env.VITE_PUBLIC = p ? s.join(u, "public") : g;
function S() {
  const r = new d({
    width: 1920,
    height: 1280,
    autoHideMenuBar: !0,
    frame: !1,
    // 隐藏原生窗口边框
    transparent: !1,
    backgroundColor: "#0f172a",
    icon: s.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: s.join(w, "../preload/index.mjs"),
      // ✅ 注意路径
      contextIsolation: !0,
      nodeIntegration: !1
      // ✅ 安全模式
    }
  });
  return p ? r.loadURL(p) : r.loadFile(s.join(g, "index.html")), r.webContents.on("did-finish-load", () => {
    r.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), r.on("maximize", () => {
    r.webContents.send("maximize-change", !0);
  }), r.on("unmaximize", () => {
    r.webContents.send("maximize-change", !1);
  }), r;
}
const _ = P(F);
i.handle("open-txt-file", async () => {
  const { canceled: r, filePaths: n } = await h.showOpenDialog({
    title: "选择一个文本文件",
    filters: [{ name: "Text Files", extensions: ["txt"] }],
    properties: ["openFile"]
  });
  if (r || n.length === 0) return null;
  const e = n[0], o = t.readFileSync(e, "utf-8");
  return { path: e, content: o };
});
i.handle("open-folder-dialog", async () => {
  const { canceled: r, filePaths: n } = await h.showOpenDialog({
    title: "选择一个文件夹",
    properties: ["openDirectory"]
  });
  if (!(r || n.length === 0))
    return n[0];
});
const a = s.join(c.getPath("userData"), "projectlist.json");
i.handle("get-project-list", async () => {
  try {
    if (t.existsSync(a)) {
      const r = t.readFileSync(a, "utf-8");
      return JSON.parse(r);
    }
    return [];
  } catch (r) {
    return console.error("Failed to read project list:", r), [];
  }
});
i.handle("add-project", async (r, n) => {
  try {
    let e = [];
    if (t.existsSync(a)) {
      const o = t.readFileSync(a, "utf-8");
      e = JSON.parse(o);
    }
    e.push(n), t.writeFileSync(a, JSON.stringify(e, null, 2));
  } catch (e) {
    console.error("Failed to add project:", e);
  }
});
i.handle("open-json-file", async () => {
  const { canceled: r, filePaths: n } = await h.showOpenDialog({
    title: "选择一个Json文件",
    filters: [{ name: "Json Files", extensions: ["json"] }],
    properties: ["openFile"]
  });
  if (r || n.length === 0) return null;
  const e = n[0], o = t.readFileSync(e, "utf-8");
  return { path: e, content: o };
});
i.handle("open-in-vscode", async (r, n) => {
  try {
    return await _(`code "${n}"`), { success: !0 };
  } catch (e) {
    return console.error("Failed to open VSCode:", e), { success: !1, error: String(e) };
  }
});
i.handle("open-in-explorer", async (r, n) => {
  try {
    return await x.openPath(n), { success: !0 };
  } catch (e) {
    return console.error("Failed to open explorer:", e), { success: !1, error: String(e) };
  }
});
i.handle("update-project", async (r, n, e) => {
  try {
    let o = [];
    if (t.existsSync(a)) {
      const f = t.readFileSync(a, "utf-8");
      o = JSON.parse(f);
    }
    const y = o.findIndex((f) => f.path === n);
    return y !== -1 ? (o[y] = e, t.writeFileSync(a, JSON.stringify(o, null, 2)), { success: !0 }) : { success: !1, error: "Project not found" };
  } catch (o) {
    return console.error("Failed to update project:", o), { success: !1, error: String(o) };
  }
});
i.handle("delete-project", async (r, n) => {
  try {
    let e = [];
    if (t.existsSync(a)) {
      const o = t.readFileSync(a, "utf-8");
      e = JSON.parse(o);
    }
    return e = e.filter((o) => o.path !== n), t.writeFileSync(a, JSON.stringify(e, null, 2)), { success: !0 };
  } catch (e) {
    return console.error("Failed to delete project:", e), { success: !1, error: String(e) };
  }
});
const l = s.join(c.getPath("userData"), "VsCodeOpener", "user.json");
function O() {
  i.handle("read-user-config", async () => {
    try {
      if (t.existsSync(l)) {
        const r = await t.promises.readFile(l, "utf-8");
        return JSON.parse(r);
      }
      return {};
    } catch (r) {
      return console.error("Failed to read user config:", r), {};
    }
  }), i.handle("write-user-config", async (r, n) => {
    try {
      const e = s.dirname(l);
      return t.existsSync(e) || t.mkdirSync(e, { recursive: !0 }), await t.promises.writeFile(l, JSON.stringify(n, null, 2)), { success: !0 };
    } catch (e) {
      return console.error("Failed to write user config:", e), { success: !1, error: e.message };
    }
  });
}
function C() {
  i.on("window-control", (r, n) => {
    const e = d.fromWebContents(r.sender);
    if (e)
      switch (n) {
        case "minimize":
          e.minimize();
          break;
        case "maximize":
          e.isMaximized() ? e.unmaximize() : e.maximize();
          break;
        case "close":
          e.close();
          break;
      }
  }), i.on("get-maximize-state", (r) => {
    const n = d.fromWebContents(r.sender);
    n && r.reply("maximize-change", n.isMaximized());
  });
}
let m = null;
c.on("window-all-closed", () => {
  process.platform !== "darwin" && (c.quit(), m = null);
});
c.on("activate", () => {
  d.getAllWindows().length === 0 && S();
});
c.whenReady().then(() => {
  m = S(), O(), C(), console.log("Main window created:", m.id);
});
