<!-- src/components/Icon.vue -->
<template>
  <component :is="iconComponent" v-if="iconComponent" class="w-8 h-8" :class="colorClass" />
</template>

<script setup lang="ts">
import * as SolidIcons from '@heroicons/vue/24/solid'
import * as OutlineIcons from '@heroicons/vue/24/outline'
import { computed } from 'vue'

interface Props {
  name: string // 图标名，例如 "HomeIcon" 或 "Cog6ToothIcon"
  variant?: 'solid' | 'outline'
  colorClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'outline',
  colorClass: 'text-gray-400 group-hover:text-white transition-colors',
})

const iconComponent = computed(() => {
  const icons = props.variant === 'solid' ? SolidIcons : OutlineIcons
  return icons[props.name as keyof typeof icons]
})
</script>
