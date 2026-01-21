import { createApp, nextTick } from 'vue'
import './assets/main.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'

const app = createApp(App)

// 注册 Pinia 和 Router
app.use(createPinia())
app.use(router)

app.mount('#app')

// 在应用挂载并渲染后执行
nextTick(() => {
  if (window.ipcRenderer) {
    window.ipcRenderer.on('main-process-message', (_event, message) => {
      //  console.log('Main process message:', message)
    })
  } else {
    console.warn('ipcRenderer is not available. Are you running in an Electron environment?')
  }
})
