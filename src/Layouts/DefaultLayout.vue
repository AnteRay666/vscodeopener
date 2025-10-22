<!-- src/layouts/DefaultLayout.vue -->
<template>
    <div class="flex h-screen bg-gray-100 text-gray-900 ">
        <!-- 左侧侧边栏 -->
        <Side />

        <!-- 右侧内容区域 -->
        <main class="flex-1 overflow-y-auto">
            <RouterView />
        </main>
    </div>
</template>

<script setup lang="ts">
    import Side from './Side.vue'
    import { RouterView } from 'vue-router'
</script>
