<!-- src/layouts/Main.vue -->
<template>
  <main class="p-6 overflow-y-auto">
    <!-- 这里的 router-view 会切换 views 下的页面 -->
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>
