<!-- views/ProjectListView.vue -->
<template>
  <!-- ProjectHeader 组件 -->
  <ProjectHeader @open-form="isFormVisible = true" />
  <div class="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors">
    <!-- 卡片网格容器 -->
    <div class="container-wrapper">
      <div class="cards-grid">
        <ProjectCard
          v-for="project in projectList"
          :key="project.path"
          :project="project"
          @edit="openEditForm"
          @delete="deleteProject" />
      </div>
    </div>

    <!-- ProjectForm 模态框 -->
    <ProjectForm
      :isVisible="isFormVisible"
      :editProject="editingProject"
      @close="closeForm"
      @add-project="addNewProject"
      @update-project="updateProject" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ProjectCard from '@/components/Card.vue'
import ProjectHeader from '@/components/ProjectHeader.vue'
import ProjectForm from '@/components/ProjectForm.vue'
import { useModal } from '@/composables/useModal'

interface Project {
  name: string
  description: string
  path: string
}

const projectList = ref<Project[]>([])
const isFormVisible = ref(false)
const editingProject = ref<Project | null>(null)
const { alert, confirm } = useModal()

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

// 打开编辑表单
const openEditForm = (project: Project) => {
  editingProject.value = project
  isFormVisible.value = true
}

// 更新项目
const updateProject = async (oldPath: string, updatedProject: Project) => {
  try {
    const result = await window.electronAPI.updateProject(oldPath, updatedProject)
    if (result.success) {
      await getProjectList() // 刷新列表
      closeForm()
    } else {
      await alert('更新项目失败：' + result.error, 'error', '更新失败')
    }
  } catch (error) {
    console.error('Failed to update project:', error)
    await alert('更新项目时出错', 'error', '错误')
  }
}

// 删除项目
const deleteProject = async (project: Project) => {
  const confirmed = await confirm(`确定要废弃项目 "${project.name}" 吗？此操作不可恢复。`, '确认废弃')
  if (!confirmed) return

  try {
    const result = await window.electronAPI.deleteProject(project.path)
    if (result.success) {
      await getProjectList() // 刷新列表
    } else {
      await alert('删除项目失败：' + result.error, 'error', '删除失败')
    }
  } catch (error) {
    console.error('Failed to delete project:', error)
    await alert('删除项目时出错', 'error', '错误')
  }
}

// 关闭表单
const closeForm = () => {
  isFormVisible.value = false
  editingProject.value = null
}

onMounted(() => {
  getProjectList()
})
</script>

<style scoped>
.container-wrapper {
  padding: 2rem 1rem;
  max-width: 1920px;
  margin: 0 auto;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  width: 100%;
}

/* 响应式断点 */
@media (min-width: 640px) {
  .container-wrapper {
    padding: 2.5rem 1.5rem;
  }

  .cards-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }
}

@media (min-width: 768px) {
  .container-wrapper {
    padding: 3rem 2rem;
  }

  .cards-grid {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  }
}

@media (min-width: 1024px) {
  .container-wrapper {
    padding: 3rem 2.5rem;
  }

  .cards-grid {
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 2.5rem;
  }
}

@media (min-width: 1280px) {
  .container-wrapper {
    padding: 4rem 3rem;
  }

  .cards-grid {
    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  }
}

@media (min-width: 1536px) {
  .cards-grid {
    grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
    gap: 3rem;
  }
}
</style>