import { app, ipcMain } from 'electron'
import fs from 'fs'
import path from 'path'

// The standard path to the user's configuration file.
const configFilePath = path.join(app.getPath('userData'), 'VsCodeOpener', 'user.json')

/**
 * Registers IPC handlers for reading and writing user configuration.
 */
export function registerConfigIPC(): void {
  /**
   * Handles reading the user configuration file.
   * - If the file exists, it reads and parses the JSON content.
   * - If the file does not exist, it returns an empty object as a default.
   * - Includes error handling for file access and parsing.
   */
  ipcMain.handle('read-user-config', async () => {
    try {
      if (fs.existsSync(configFilePath)) {
        const data = await fs.promises.readFile(configFilePath, 'utf-8')
        return JSON.parse(data)
      }
      // Return a default empty object if the file doesn't exist.
      return {}
    } catch (error) {
      console.error('Failed to read user config:', error)
      // Return a default empty object in case of any error.
      return {}
    }
  })

  /**
   * Handles writing data to the user configuration file.
   * - Ensures the directory exists before writing.
   * - Serializes the given data object to JSON and writes it to the file.
   */
  ipcMain.handle('write-user-config', async (_, data: unknown) => {
    try {
      const dir = path.dirname(configFilePath)
      // Ensure the directory exists, creating it if necessary.
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }

      // Write the serialized data to the configuration file.
      await fs.promises.writeFile(configFilePath, JSON.stringify(data, null, 2))
      return { success: true }
    } catch (error) {
      console.error('Failed to write user config:', error)
      return { success: false, error: (error as Error).message }
    }
  })
}