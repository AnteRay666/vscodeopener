<template>
    <div class="titlebar" :class="{ 'dark': isDark }">
        <div class="titlebar-drag-region">
            <div class="titlebar-title">我的项目管理器</div>
        </div>
        <div class="titlebar-controls">
            <button class="titlebar-button minimize" @click="minimizeWindow" title="最小化">
                <svg width="12" height="12" viewBox="0 0 12 12">
                    <rect x="0" y="5" width="12" height="2" fill="currentColor"/>
                </svg>
            </button>
            <button class="titlebar-button maximize" @click="maximizeWindow" :title="isMaximized ? '还原' : '最大化'">
                <svg v-if="!isMaximized" width="12" height="12" viewBox="0 0 12 12">
                    <rect x="1" y="1" width="10" height="10" stroke="currentColor" stroke-width="1.5" fill="none"/>
                </svg>
                <svg v-else width="12" height="12" viewBox="0 0 12 12">
                    <rect x="2" y="0" width="10" height="10" stroke="currentColor" stroke-width="1.5" fill="none"/>
                    <rect x="0" y="2" width="10" height="10" stroke="currentColor" stroke-width="1.5" fill="none"/>
                </svg>
            </button>
            <button class="titlebar-button close" @click="closeWindow" title="关闭">
                <svg width="12" height="12" viewBox="0 0 12 12">
                    <path d="M1 1 L11 11 M11 1 L1 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isMaximized = ref(false)
const isDark = ref(false)

// 窗口控制函数
const minimizeWindow = () => {
    window.electronAPI.windowControl('minimize')
}

const maximizeWindow = () => {
    window.electronAPI.windowControl('maximize')
}

const closeWindow = () => {
    window.electronAPI.windowControl('close')
}

// 监听窗口最大化状态变化
const handleMaximizeChange = (_event: any, maximized: boolean) => {
    isMaximized.value = maximized
}

// 检测暗色模式
const checkDarkMode = () => {
    isDark.value = document.documentElement.classList.contains('dark')
}

// 监听暗色模式变化
const observer = new MutationObserver(checkDarkMode)

onMounted(() => {
    checkDarkMode()
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
    })

    // 监听窗口最大化状态
    window.electronAPI.onMaximizeChange(handleMaximizeChange)
})

onUnmounted(() => {
    observer.disconnect()
})
</script>

<style scoped>
.titlebar {
    display: flex;
    height: 32px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 249, 255, 0.95) 100%);
    border-bottom: 1px solid rgba(147, 197, 253, 0.2);
    user-select: none;
    -webkit-app-region: no-drag;
}

.titlebar.dark {
    background: linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%);
    border-bottom: 1px solid rgba(59, 130, 246, 0.2);
}

.titlebar-drag-region {
    flex: 1;
    display: flex;
    align-items: center;
    padding-left: 12px;
    -webkit-app-region: drag;
}

.titlebar-title {
    font-size: 13px;
    font-weight: 500;
    color: #374151;
}

.titlebar.dark .titlebar-title {
    color: #e5e7eb;
}

.titlebar-controls {
    display: flex;
    -webkit-app-region: no-drag;
}

.titlebar-button {
    width: 46px;
    height: 32px;
    border: none;
    background: transparent;
    color: #6b7280;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s ease;
}

.titlebar.dark .titlebar-button {
    color: #9ca3af;
}

.titlebar-button:hover {
    background: rgba(59, 130, 246, 0.1);
    color: #3b82f6;
}

.titlebar.dark .titlebar-button:hover {
    background: rgba(59, 130, 246, 0.15);
    color: #60a5fa;
}

.titlebar-button.close:hover {
    background: #ef4444;
    color: white;
}

.titlebar-button:active {
    transform: scale(0.95);
}
</style>
