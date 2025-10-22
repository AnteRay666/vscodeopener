<!-- views/ProjectListView.vue -->
<template>
  <!-- ProjectHeader 组件 -->
  <ProjectHeader @open-form="isFormVisible = true" />
  <div class="pt-8 min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors">
    <!-- 卡片网格 -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
      <ProjectCard v-for="project in projects" :key="project.path" :project="project" />
    </div>

    <!-- ProjectForm 模态框 -->
    <ProjectForm :isVisible="isFormVisible" @close="isFormVisible = false" @add-project="addNewProject" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ProjectCard from '@/components/Card.vue'
import ProjectHeader from '@/components/ProjectHeader.vue'
import ProjectForm from '@/components/ProjectForm.vue'

interface Project {
  name: string
  description: string
  path: string
}

// 模拟数据
const projects = ref<Project[]>([
  {
    name: 'Vue Launcher',
    description: '快速启动和管理你的 Vue 项目。',
    path: '/Users/ray/Projects/vue-launcher',
  },
  {
    name: 'React Starter',
    description: 'React 项目启动模板。',
    path: '/Users/ray/Projects/react-starter',
  },
  {
    name: 'Node Server',
    description: '本地 Node.js 服务项目。',
    path: '/Users/ray/Projects/node-server',
  },
  {
    name: 'Electron App',
    description: '桌面应用项目。',
    path: '/Users/ray/Projects/electron-app',
  },
])

const isFormVisible = ref(false)

const addNewProject = (newProject: Project) => {

  projects.value.push({ ...newProject, path: newProject.path || '暂无路径' });
  console.log('新项目已添加:', newProject);
}
</script>

<style scoped>
/* 保持原有的样式 */
</style>