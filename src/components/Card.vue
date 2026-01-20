<!-- components/ProjectCard.vue -->
<template>
    <div class="project-card rounded-2xl w-full h-full p-6 shadow-lg border transition-all duration-300
           bg-white/90 text-gray-900 border-gray-200
           dark:bg-gray-950/95 dark:text-gray-100 dark:border-gray-800
           backdrop-blur-md hover:shadow-xl hover:scale-[1.02] hover:border-indigo-300 dark:hover:border-indigo-700
           flex flex-col">
        <!-- 图标区 -->
        <div class="grid grid-cols-4 gap-3 place-items-center mb-5 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div class="relative group cursor-pointer" @click="onVscodeClick">
                <vscode class="w-9 h-9 sm:w-10 sm:h-10 text-blue-500 dark:text-blue-400 transition-all duration-200 group-hover:scale-125 group-hover:drop-shadow-lg" />
                <span class="tooltip">通过 VSCode 打开</span>
            </div>
            <div class="relative group cursor-pointer" @click="onFolderClick">
                <folder
                    class="w-9 h-9 sm:w-10 sm:h-10 text-yellow-500 dark:text-yellow-400 transition-all duration-200 group-hover:scale-125 group-hover:drop-shadow-lg" />
                <span class="tooltip">在资源管理器中查看</span>
            </div>
            <div class="relative group cursor-pointer" @click="onEditClick">
                <editor
                    class="w-9 h-9 sm:w-10 sm:h-10 text-green-500 dark:text-green-400 transition-all duration-200 group-hover:scale-125 group-hover:drop-shadow-lg" />
                <span class="tooltip">编辑信息</span>
            </div>
            <div class="relative group cursor-pointer" @click="onAbandonClick">
                <abandon class="w-9 h-9 sm:w-10 sm:h-10 text-red-500 dark:text-red-400 transition-all duration-200 group-hover:scale-125 group-hover:drop-shadow-lg" />
                <span class="tooltip">废弃项目</span>
            </div>
        </div>

        <!-- 项目信息区 - 使用 flex-1 让它占据剩余空间 -->
        <div class="flex-1 flex flex-col min-w-0">
            <!-- 项目名称 -->
            <h2 class="text-lg sm:text-xl font-bold mb-3 text-center truncate px-2" :title="project.name">
                {{ project.name }}
            </h2>

            <!-- 项目描述 -->
            <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-300 text-center mb-4 line-clamp-3 px-2 flex-1">
                {{ project.description }}
            </p>

            <!-- 项目路径 -->
            <div class="text-xs text-gray-500 dark:text-gray-400 bg-gray-100/80 dark:bg-gray-800/80
                 px-3 py-2 rounded-lg truncate w-full text-left border border-gray-200 dark:border-gray-700"
                 :title="project.path">
                <span class="font-medium">Path:</span> {{ project.path }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import vscode from './icons/vscode.vue'
import folder from './icons/folder.vue'
import editor from './icons/editor.vue'
import abandon from './icons/abandon.vue'
import { useModal } from '@/composables/useModal'

// 接收 project 作为 props
interface Project {
    name: string
    description: string
    path: string
}

const { project } = defineProps<{
    project: Project
}>()

const emit = defineEmits(['edit', 'delete'])
const { alert } = useModal()

// 点击事件处理函数
async function onVscodeClick() {
    try {
        const result = await window.electronAPI.openInVscode(project.path)
        if (!result.success) {
            await alert('无法打开 VSCode，请确保已安装 VSCode 并将其添加到系统 PATH 中', 'error', '打开失败')
        }
    } catch (error) {
        console.error('打开 VSCode 失败:', error)
        await alert('打开 VSCode 时出错', 'error', '错误')
    }
}

async function onFolderClick() {
    try {
        const result = await window.electronAPI.openInExplorer(project.path)
        if (!result.success) {
            await alert('无法打开资源管理器', 'error', '打开失败')
        }
    } catch (error) {
        console.error('打开资源管理器失败:', error)
        await alert('打开资源管理器时出错', 'error', '错误')
    }
}

function onEditClick() {
    emit('edit', project)
}

function onAbandonClick() {
    emit('delete', project)
}
</script>

<style scoped>
.project-card {
    min-height: 280px;
    max-width: 100%;
}

.tooltip {
    position: absolute;
    bottom: -2.5rem;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(17, 24, 39, 0.95);
    color: #f9fafb;
    padding: 0.375rem 0.75rem;
    border-radius: 0.375rem;
    font-size: 0.625rem;
    opacity: 0;
    pointer-events: none;
    white-space: nowrap;
    transition: opacity 0.2s ease-in-out;
    z-index: 50;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.group:hover .tooltip {
    opacity: 1;
}

.dark .tooltip {
    background-color: rgba(243, 244, 246, 0.95);
    color: #111827;
}

/* 多行文本截断 */
.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    word-break: break-word;
}

/* 响应式调整 */
@media (max-width: 640px) {
    .project-card {
        min-height: 260px;
    }
}
</style>
