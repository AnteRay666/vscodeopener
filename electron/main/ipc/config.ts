import { ipcMain } from 'electron'
import { readConfig, writeConfig } from '../config/configManager'

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
    return readConfig()
  })

  /**
   * Handles writing data to the user configuration file.
   * - Ensures the directory exists before writing.
   * - Serializes the given data object to JSON and writes it to the file.
   */
  ipcMain.handle('write-user-config', async (_, data: unknown) => {
    const success = writeConfig(data as any)
    return { success }
  })
}