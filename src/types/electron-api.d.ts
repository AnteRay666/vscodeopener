export interface IElectronAPI {
  invoke: (channel: string, ...args: any[]) => Promise<any>
  openTxtFile: () => Promise<{ path: string; content: string } | null>
  readUserConfig: () => Promise<any>
  writeUserConfig: (data: any) => Promise<void>
  getProjectList: () => Promise<any[]>
  addProject: (project: any) => Promise<void>
  openFolderDialog: () => Promise<string | undefined>
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
