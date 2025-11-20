<!-- views/ProjectListView.vue -->
<template>
  <!-- ProjectHeader 组件 -->
  <ProjectHeader @open-form="isFormVisible = true" />
  <div class="pt-8 min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors">
    <!-- 卡片网格 -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
      <ProjectCard v-for="project in projectList" :key="project.path" :project="project" />
    </div>

    <!-- ProjectForm 模态框 -->
    <ProjectForm :isVisible="isFormVisible" @close="isFormVisible = false" @add-project="addNewProject" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ProjectCard from '@/components/Card.vue'
import ProjectHeader from '@/components/ProjectHeader.vue'
import ProjectForm from '@/components/ProjectForm.vue'

interface Project {
  name: string
  description: string
  path: string
}

const projectList = ref<Project[]>([])
const isFormVisible = ref(false)

// 获取项目列表
const getProjectList = async () => {
  try {
    const list = await window.electronAPI.getProjectList()
    projectList.value = list
  } catch (error) {
    console.error('Failed to get project list:', error)
  }
}

// 添加新项目
const addNewProject = async (newProject: Project) => {
  try {
    await window.electronAPI.addProject(newProject)
    await getProjectList() // 刷新列表
    isFormVisible.value = false // 关闭表单
  } catch (error) {
    console.error('Failed to add project:', error)
  }
}

onMounted(() => {
  getProjectList()
})
</script>

<style scoped>
/* 保持原有的样式 */
</style>