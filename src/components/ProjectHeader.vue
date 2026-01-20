<!-- components/ProjectHeader.vue -->
<template>
    <div class="sticky top-0 z-10 flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-800 shadow-md">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">我的项目列表</h1>
        <button @click="emit('open-form')"
            class="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-colors">
            <!-- 使用你的 Icon 组件 -->
            <Icon name="PlusIcon" variant="outline" class="h-5 w-5 inline-block mr-2" colorClass="text-white" />
            添加项目
        </button>
    </div>
</template>

<script setup lang="ts">
// defineEmits 是编译器宏，无需导入
import Icon from '@/components/Icon.vue' // 导入你的 Icon 组件

const emit = defineEmits(['open-form'])
</script>

<style scoped>
/* 可以根据需要添加额外的样式 */
</style>