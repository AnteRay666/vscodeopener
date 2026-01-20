<script setup lang="ts">
import { RouterView } from 'vue-router'
import Modal from '@/components/Modal.vue'
import { useModal } from '@/composables/useModal'

const { isVisible, modalOptions, handleConfirm, handleCancel } = useModal()
</script>

<template>
  <RouterView />
  <Modal
    :isVisible="isVisible"
    :type="modalOptions.type"
    :title="modalOptions.title"
    :message="modalOptions.message"
    :confirmText="modalOptions.confirmText"
    @confirm="handleConfirm"
    @cancel="handleCancel" />
</template>
