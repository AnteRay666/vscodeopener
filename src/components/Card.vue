<!-- components/ProjectCard.vue -->
<template>
    <div class="rounded-2xl w-80 p-6 shadow-md border transition-all duration-300 
           bg-white/80 text-gray-900 border-gray-200 
           dark:bg-gray-950/90 dark:text-gray-100 dark:border-gray-800
           backdrop-blur-md hover:scale-[1.02]">
        <!-- 图标区 -->
        <div class="grid grid-cols-4 gap-4 place-items-center mb-4">
            <div class="relative group cursor-pointer" @click="onVscodeClick">
                <vscode class="w-10 h-10 text-blue-500 dark:text-blue-400 transition-transform group-hover:scale-110" />
                <span class="tooltip">通过 VSCode 打开</span>
            </div>
            <div class="relative group cursor-pointer" @click="onFolderClick">
                <folder
                    class="w-10 h-10 text-yellow-500 dark:text-yellow-400 transition-transform group-hover:scale-110" />
                <span class="tooltip">在资源管理器中查看</span>
            </div>
            <div class="relative group cursor-pointer" @click="onEditClick">
                <editor
                    class="w-10 h-10 text-green-500 dark:text-green-400 transition-transform group-hover:scale-110" />
                <span class="tooltip">编辑信息</span>
            </div>
            <div class="relative group cursor-pointer" @click="onAbandonClick">
                <abandon class="w-10 h-10 text-red-500 dark:text-red-400 transition-transform group-hover:scale-110" />
                <span class="tooltip">废弃项目</span>
            </div>
        </div>

        <!-- 分割线 -->
        <div class="h-px bg-gray-300 dark:bg-gray-700 mb-5"></div>

        <!-- 项目名称 -->
        <h2 class="text-xl font-semibold mb-2 text-center">
            {{ project.name }}
        </h2>

        <!-- 项目描述 -->
        <p class="text-sm text-gray-600 dark:text-gray-300 text-center mb-4">
            {{ project.description }}
        </p>

        <!-- 项目路径 -->
        <div class="text-xs text-gray-500 dark:text-gray-400 bg-gray-100/60 dark:bg-gray-800/60
             px-3 py-2 rounded-md truncate w-full text-center">
            Path: {{ project.path }}
        </div>
    </div>
</template>

<script setup lang="ts">
import vscode from './icons/vscode.vue'
import folder from './icons/folder.vue'
import editor from './icons/editor.vue'
import abandon from './icons/abandon.vue'

// 接收 project 作为 props
interface Project {
    name: string
    description: string
    path: string
}

const { project } = defineProps<{
    project: Project
}>()

// 点击事件占位函数
function onVscodeClick() {
    console.log('打开 VSCode:', project.path)
}

function onFolderClick() {
    console.log('打开资源管理器:', project.path)
}

function onEditClick() {
    console.log('编辑项目:', project.name)
}

function onAbandonClick() {
    console.log('废弃项目:', project.name)
}
</script>

<style scoped>
.tooltip {
    position: absolute;
    bottom: -2rem;
    left: 50%;
    transform: translateX(-50%);
    background-color: #f3f4f6;
    color: #111827;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.625rem;
    opacity: 0;
    pointer-events: none;
    white-space: nowrap;
    transition: opacity 0.2s;
}

.group:hover .tooltip {
    opacity: 1;
}

.dark .tooltip {
    background-color: #1f2937;
    color: #f9fafb;
}
</style>
