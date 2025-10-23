import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const APP_ROOT = path.join(__dirname, '..', '..')
const MAIN_DIST = path.join(APP_ROOT, 'dist-electron')
const RENDERER_DIST = path.join(APP_ROOT, 'dist')
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

process.env.APP_ROOT = APP_ROOT
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(APP_ROOT, 'public')
  : RENDERER_DIST

export {
  __dirname,
  APP_ROOT,
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL,
}
