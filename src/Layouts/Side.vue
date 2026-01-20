<template>
    <aside
        class="h-full w-20 flex flex-col justify-between py-4 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <!-- 上部图标 -->
        <nav class="flex flex-col items-center space-y-4">
            <RouterLink v-for="item in topMenu" :key="item.path" :to="item.path"
                :aria-label="item.label"
                class="relative flex items-center justify-center w-12 h-12 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-800 transition group"
                :class="{ 'bg-gray-800': isActive(item.path) }">
                <Icon :name="item.icon" />

                <!-- 悬浮提示文字 -->
                <span
                    aria-hidden="true"
                    class="absolute left-14 top-1/2 -translate-y-1/2 px-2 py-1 text-sm bg-gray-800 text-white rounded-md opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 whitespace-nowrap shadow-lg z-50">
                    {{ item.label }}
                </span>
            </RouterLink>
        </nav>

        <!-- 下部图标 -->
        <nav class="flex flex-col items-center space-y-4">
            <button @click="toggleTheme"
                aria-label="切换主题"
                class="relative flex items-center justify-center w-12 h-12 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-800 transition group">
                <Icon :name="theme === 'dark' ? 'SunIcon' : 'MoonIcon'" />
            </button>
            <RouterLink v-for="item in bottomMenu" :key="item.path" :to="item.path"
                :aria-label="item.label"
                class="relative flex items-center justify-center w-12 h-12 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-800 transition group"
                :class="{ 'bg-gray-800': isActive(item.path) }">
                <Icon :name="item.icon" />

                <span
                    aria-hidden="true"
                    class="absolute left-14 top-1/2 -translate-y-1/2 px-2 py-1 text-sm bg-gray-800 text-white rounded-md opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 whitespace-nowrap shadow-lg z-50">
                    {{ item.label }}
                </span>
            </RouterLink>
        </nav>
    </aside>
</template>

<script setup lang="ts">
import { useRoute, RouterLink } from 'vue-router'
import Icon from '@/components/Icon.vue'

const route = useRoute()

interface MenuItem {
    path: string
    label: string
    icon: string
}

const topMenu: MenuItem[] = [
    { path: '/', label: '首页', icon: 'HomeIcon' },
    { path: '/projectlist', label: '项目', icon: 'FolderIcon' },
    { path: '/test', label: '测试界面', icon: 'BeakerIcon' },
]

const bottomMenu: MenuItem[] = [
    { path: '/settings', label: '设置', icon: 'Cog6ToothIcon' },
]

const isActive = (path: string) => route.path === path
// 主题切换
import { computed } from 'vue'
import { useThemeStore } from '@/stores/theme'
const themeStore = useThemeStore()
const theme = computed(() => themeStore.theme)
function toggleTheme() {
    const t = themeStore.theme
    if (t === 'light' || t === 'system') themeStore.setTheme('dark')
    else themeStore.setTheme('light')
}
</script>
