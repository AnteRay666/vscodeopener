<!-- src/layouts/DefaultLayout.vue -->
<template>
    <div class="flex flex-col h-screen bg-gray-100 text-gray-900">
        <!-- 自定义标题栏 -->
        <TitleBar />

        <!-- 主内容区域 -->
        <div class="flex flex-1 overflow-hidden">
            <!-- 左侧侧边栏 -->
            <Side />

            <!-- 右侧内容区域 -->
            <main class="flex-1 overflow-y-auto custom-scrollbar">
                <RouterView />
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
    import TitleBar from '@/components/TitleBar.vue'
    import Side from './Side.vue'
    import { RouterView } from 'vue-router'
</script>

<style scoped>
/* 现代化滚动条样式 */
.custom-scrollbar::-webkit-scrollbar {
    width: 10px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: linear-gradient(to bottom, rgba(240, 249, 255, 0.3), rgba(232, 244, 248, 0.3));
    border-radius: 10px;
    margin: 4px 0;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.5), rgba(34, 211, 238, 0.5));
    border-radius: 10px;
    border: 2px solid transparent;
    background-clip: padding-box;
    transition: all 0.3s ease;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(34, 211, 238, 0.8));
    border-width: 1px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:active {
    background: linear-gradient(135deg, rgb(59, 130, 246), rgb(34, 211, 238));
}

/* 深色模式滚动条 */
.dark .custom-scrollbar::-webkit-scrollbar-track {
    background: linear-gradient(to bottom, rgba(15, 23, 42, 0.5), rgba(30, 41, 59, 0.5));
}

.dark .custom-scrollbar::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.6), rgba(34, 197, 94, 0.5));
}

.dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(34, 197, 94, 0.8));
}

.dark .custom-scrollbar::-webkit-scrollbar-thumb:active {
    background: linear-gradient(135deg, rgb(59, 130, 246), rgb(34, 197, 94));
}

/* Firefox 滚动条样式 */
.custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(59, 130, 246, 0.5) rgba(240, 249, 255, 0.3);
}

.dark .custom-scrollbar {
    scrollbar-color: rgba(59, 130, 246, 0.6) rgba(15, 23, 42, 0.5);
}
</style>
