import { app } from 'electron'
import fs from 'fs'
import path from 'path'

const configFilePath = path.join(app.getPath('userData'), 'VsCodeOpener', 'user.json')

interface Config {
    windowBounds?: {
        width: number
        height: number
    }
    [key: string]: any
}

/**
 * 读取配置文件
 */
export function readConfig(): Config {
    try {
        //  console.log('Reading config from:', configFilePath)
        if (fs.existsSync(configFilePath)) {
            const data = fs.readFileSync(configFilePath, 'utf-8')
            const config = JSON.parse(data)
            //  console.log('Config loaded:', config)
            return config
        } else {
            //  console.log('Config file does not exist, returning empty config')
        }
    } catch (error) {
        console.error('Failed to read config:', error)
    }
    return {}
}

/**
 * 写入配置文件
 */
export function writeConfig(config: Config): boolean {
    try {
        const dir = path.dirname(configFilePath)

        // 确保目录存在
        if (!fs.existsSync(dir)) {
            //  console.log('Creating config directory:', dir)
            fs.mkdirSync(dir, { recursive: true })
        }

        const jsonString = JSON.stringify(config, null, 2)
        //  console.log('Writing config to:', configFilePath)
        //  console.log('Config content:', jsonString)

        fs.writeFileSync(configFilePath, jsonString, 'utf-8')

        // 验证写入
        if (fs.existsSync(configFilePath)) {
            //  console.log('Config file written successfully!')
            return true
        } else {
            console.error('Config file was not created!')
            return false
        }
    } catch (error) {
        console.error('Failed to write config:', error)
        return false
    }
}

/**
 * 更新配置文件（合并现有配置）
 */
export function updateConfig(updates: Partial<Config>): boolean {
    //  console.log('Updating config with:', updates)
    const currentConfig = readConfig()
    const newConfig = { ...currentConfig, ...updates }
    //  console.log('Merged config:', newConfig)
    return writeConfig(newConfig)
}

/**
 * 获取配置文件路径
 */
export function getConfigFilePath(): string {
    return configFilePath
}
