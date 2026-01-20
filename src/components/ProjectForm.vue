<!-- components/ProjectForm.vue -->
<template>
    <div v-if="isVisible" class="fixed inset-0 bg-gray-900/50 flex items-center justify-center p-4 z-50">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 relative">
            <button @click="closeForm"
                class="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                <!-- 使用你的 Icon 组件 -->
                <Icon name="XMarkIcon" variant="outline" class="h-6 w-6"
                    colorClass="text-gray-400 dark:text-gray-300 group-hover:text-gray-600 dark:hover:text-gray-100" />
            </button>

            <h2 class="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                {{ isEditMode ? '编辑项目' : '添加新项目' }}
            </h2>

            <form @submit.prevent="submitForm">
                <div class="mb-4">
                    <label for="projectName"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300">项目名称</label>
                    <input type="text" id="projectName" v-model="form.name"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                        required />
                </div>

                <div class="mb-4">
                    <label for="projectDescription"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300">项目描述</label>
                    <textarea id="projectDescription" v-model="form.description" rows="3"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                        required></textarea>
                </div>

                <div class="mb-6">
                    <label for="projectPath"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300">项目路径</label>
                    <div class="flex items-center mt-1">
                        <input type="text" id="projectPath" v-model="form.path"
                            class="flex-1 px-3 py-2 border border-gray-300 rounded-l-md shadow-sm bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400"
                            placeholder="点击右侧按钮选择" readonly />
                        <button type="button" @click="selectFolder"
                            class="px-4 py-2 bg-gray-200 text-gray-700 rounded-r-md border border-l-0 border-gray-300 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-500 transition-colors">
                            选择文件夹
                        </button>
                    </div>
                </div>

                <div class="flex justify-end space-x-3">
                    <button type="button" @click="closeForm"
                        class="px-5 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors">
                        取消
                    </button>
                    <button type="submit"
                        class="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-colors">
                        添加
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Icon from '@/components/Icon.vue' // 导入你的 Icon 组件
import { useModal } from '@/composables/useModal'

interface ProjectFormData {
    name: string
    description: string
    path: string
}

const props = defineProps<{
    isVisible: boolean
    editProject?: {
        name: string
        description: string
        path: string
    } | null
}>()

const emit = defineEmits(['close', 'add-project', 'update-project'])
const { alert } = useModal()

const form = ref<ProjectFormData>({
    name: '',
    description: '',
    path: '',
})

const isEditMode = ref(false)
const originalPath = ref('')

watch(() => props.isVisible, (newVal) => {
    if (newVal) {
        if (props.editProject) {
            // 编辑模式：填充现有数据
            isEditMode.value = true
            originalPath.value = props.editProject.path
            form.value = {
                name: props.editProject.name,
                description: props.editProject.description,
                path: props.editProject.path,
            }
        } else {
            // 添加模式：清空表单
            isEditMode.value = false
            originalPath.value = ''
            form.value = {
                name: '',
                description: '',
                path: '',
            }
        }
    }
})

const submitForm = async () => {
    if (!form.value.name || !form.value.path) {
        await alert('请选择一个项目文件夹！', 'warning', '提示');
        return;
    }

    if (isEditMode.value) {
        // 编辑模式：发送更新事件
        emit('update-project', originalPath.value, { ...form.value });
    } else {
        // 添加模式：发送添加事件
        emit('add-project', { ...form.value });
    }
    closeForm();
}

const selectFolder = async () => {
    try {
        const folderPath = await window.electronAPI.openFolderDialog();
        if (folderPath) {
            form.value.path = folderPath;
            // 自动填充项目名称
            form.value.name = folderPath.split(/[\\/]/).pop() || '';
        }
    } catch (error) {
        console.error('Failed to open folder dialog:', error);
    }
}

const closeForm = () => {
    emit('close');
}
</script>

<style scoped>
/* 可以根据需要添加额外的样式 */
</style>