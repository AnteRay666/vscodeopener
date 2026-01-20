<!-- components/ProjectHeader.vue -->
<template>
    <div class="header-container sticky top-0 z-10 flex justify-between items-center p-4 shadow-lg backdrop-blur-md">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">我的项目列表</h1>
        <button @click="emit('open-form')"
            class="px-5 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105">
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
/* 清新简约的头部样式 */
.header-container {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(240, 249, 255, 0.9) 100%);
    border-bottom: 1px solid rgba(147, 197, 253, 0.2);
}

.dark .header-container {
    background: linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.95) 100%);
    border-bottom: 1px solid rgba(59, 130, 246, 0.2);
}
</style>