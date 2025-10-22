<template>
    <div class="p-8 min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors">
        <h1 class="text-2xl font-semibold mb-6">主题设置</h1>

        <div class="flex gap-4">
            <button v-for="opt in options" :key="opt.value" @click="setTheme(opt.value)"
                class="px-4 py-2 rounded-lg border transition-all duration-200" :class="{
                    'bg-gray-900 text-white border-gray-700': theme === opt.value,
                    'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-400':
                        theme !== opt.value,
                }">
                {{ opt.label }}
            </button>
        </div>

        <p class="mt-6 text-gray-600 dark:text-gray-400">
            当前主题：<span class="font-semibold">{{ themeLabel }}</span>
        </p>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '@/stores/theme'
import type { ThemeMode } from '@/stores/theme'
// 使用 Pinia store
const themeStore = useThemeStore()
const theme = computed(() => themeStore.theme)
const setTheme = (value: ThemeMode) => themeStore.setTheme(value)

// 显示文字
const themeLabel = computed(() => {
    switch (theme.value) {
        case 'dark':
            return '深色模式'
        case 'light':
            return '浅色模式'
        default:
            return '跟随系统'
    }
})

const options: { label: string; value: ThemeMode }[] = [
    { label: '☀️ 明亮模式', value: 'light' },
    { label: '🌙 暗黑模式', value: 'dark' },
    { label: '🖥️ 跟随系统', value: 'system' },
]
</script>
