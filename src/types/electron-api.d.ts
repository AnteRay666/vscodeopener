export interface IElectronAPI {
  invoke: (channel: string, ...args: any[]) => Promise<any>
  openTxtFile: () => Promise<{ path: string; content: string } | null>
  readUserConfig: () => Promise<any>
  writeUserConfig: (data: any) => Promise<void>
  getProjectList: () => Promise<any[]>
  addProject: (project: any) => Promise<void>
  openFolderDialog: () => Promise<string | undefined>
  openInVscode: (projectPath: string) => Promise<{ success: boolean; error?: string }>
  openInExplorer: (projectPath: string) => Promise<{ success: boolean; error?: string }>
  updateProject: (oldPath: string, updatedProject: any) => Promise<{ success: boolean; error?: string }>
  deleteProject: (projectPath: string) => Promise<{ success: boolean; error?: string }>
  windowControl: (action: 'minimize' | 'maximize' | 'close') => void
  onMaximizeChange: (callback: (event: any, maximized: boolean) => void) => void
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
