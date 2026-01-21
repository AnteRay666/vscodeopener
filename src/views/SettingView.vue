<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <!-- 页面标题 -->
        <div class="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 px-8 py-6">
            <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">设置</h1>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">管理应用程序的外观和配置</p>
        </div>

        <!-- 设置列表 -->
        <div class="max-w-4xl mx-auto p-8 space-y-6">
            <!-- 主题设置卡片 -->
            <div class="bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
                    <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">外观</h2>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">选择应用程序的主题模式</p>
                </div>
                <div class="px-6 py-5">
                    <div class="grid grid-cols-3 gap-3">
                        <button v-for="opt in options" :key="opt.value" @click="setTheme(opt.value)"
                            class="flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105"
                            :class="{
                                'border-blue-500 bg-blue-50 dark:bg-blue-950/30': theme === opt.value,
                                'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600': theme !== opt.value,
                            }">
                            <span class="text-3xl mb-2">{{ opt.icon }}</span>
                            <span class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ opt.label }}</span>
                        </button>
                    </div>
                    <div class="mt-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <span class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                            ✓
                        </span>
                        <span>当前主题：<span class="font-semibold">{{ themeLabel }}</span></span>
                    </div>
                </div>
            </div>

            <!-- 窗口设置卡片 -->
            <div class="bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
                    <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">窗口</h2>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">窗口大小和位置设置</p>
                </div>
                <div class="px-6 py-5">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-900 dark:text-gray-100">窗口大小持久化</p>
                            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">退出时自动保存窗口大小，下次启动时恢复</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
                                已启用
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 配置文件卡片 -->
            <div class="bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
                    <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">配置文件</h2>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">查看应用程序的配置信息</p>
                </div>
                <div class="px-6 py-5">
                    <button @click="toggleConfigView"
                        class="w-full flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <div class="flex items-center gap-3">
                            <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800">
                                <span class="text-xl">📄</span>
                            </div>
                            <div class="text-left">
                                <p class="text-sm font-medium text-gray-900 dark:text-gray-100">user.json</p>
                                <p class="text-xs text-gray-500 dark:text-gray-400">只读模式</p>
                            </div>
                        </div>
                        <svg class="w-5 h-5 text-gray-400 transition-transform duration-200"
                            :class="{ 'rotate-180': showConfig }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    <!-- 配置内容展开区域 -->
                    <transition enter-active-class="transition-all duration-300 ease-out"
                        enter-from-class="opacity-0 max-h-0" enter-to-class="opacity-100 max-h-96"
                        leave-active-class="transition-all duration-300 ease-in"
                        leave-from-class="opacity-100 max-h-96" leave-to-class="opacity-0 max-h-0">
                        <div v-if="showConfig" class="mt-4 overflow-hidden">
                            <div class="relative">
                                <pre
                                    class="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-xs text-gray-800 dark:text-gray-200 overflow-x-auto max-h-80 overflow-y-auto font-mono">{{ configText }}</pre>
                                <div
                                    class="absolute top-2 right-2 px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-400">
                                    只读
                                </div>
                            </div>
                            <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                配置文件会自动保存，无需手动编辑
                            </p>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useThemeStore } from '../stores/theme'
import type { ThemeMode } from '../stores/theme'

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

const options: { label: string; value: ThemeMode; icon: string }[] = [
    { label: '浅色', value: 'light', icon: '☀️' },
    { label: '深色', value: 'dark', icon: '🌙' },
    { label: '系统', value: 'system', icon: '🖥️' },
]

// 配置文件相关
const configText = ref('')
const showConfig = ref(false)

const toggleConfigView = async () => {
    if (!showConfig.value && !configText.value) {
        await loadConfig()
    }
    showConfig.value = !showConfig.value
}

const loadConfig = async () => {
    const data = await window.electronAPI.readUserConfig()
    configText.value = JSON.stringify(data, null, 2)
}

onMounted(() => {
    // 不再自动加载配置，改为点击时加载
})
</script>
