<template>
  <div class="p-8 dark:bg-gray-950 dark:text-gray-100 transition-colors">
    <button @click="openFile" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
      打开 TXT 文件
    </button>

    <div v-if="fileContent"
      class="mt-4 p-4 border rounded bg-gray-100 whitespace-pre-wrap dark:bg-gray-950 dark:text-gray-100 transition-colors">
      <p class="font-mono text-gray-700 dark:bg-gray-950 dark:text-gray-100 transition-colors">路径：{{ filePath }}</p>
      <pre class="mt-2 dark:bg-gray-950 dark:text-gray-100 transition-colors">{{ fileContent }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const fileContent = ref('')
const filePath = ref('')

const openFile = async () => {
  console.log('点击打开文件按钮')
  const result = await window.electronAPI.openTxtFile()
  console.log('返回结果：', result)

  if (result) {
    filePath.value = result.path
    fileContent.value = result.content
  } else {
    alert('未选择文件')
  }
}
</script>
