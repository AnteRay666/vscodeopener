import { defineStore } from 'pinia'
import { ref, watchEffect } from 'vue'

export type ThemeMode = 'light' | 'dark' | 'system'

export const useThemeStore = defineStore('theme', () => {
  // 从 localStorage 读取或默认 system
  const theme = ref<ThemeMode>(
    (localStorage.getItem('theme') as ThemeMode) || 'system'
  )

  /** 应用主题到 <html> 标签 */
  function applyTheme() {
    const root = document.documentElement
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = theme.value === 'dark' || (theme.value === 'system' && prefersDark)
    root.classList.toggle('dark', isDark)
  }

  /** 设置主题并持久化 */
  function setTheme(newTheme: ThemeMode) {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)
    applyTheme()
  }

  /** 监听系统暗色模式变化（仅在 system 模式生效） */
  watchEffect(() => {
    applyTheme()

    if (theme.value === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)')
      mq.onchange = applyTheme
    }
  })

  return {
    theme,
    setTheme,
    applyTheme,
  }
})
