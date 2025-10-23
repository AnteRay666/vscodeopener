export { }

declare global {
    interface Window {
        electronAPI: {
            openTxtFile: () => Promise<{ path: string; content: string } | null>
            invoke: (channel: string, ...args: any[]) => Promise<any>
        }
    }
}
