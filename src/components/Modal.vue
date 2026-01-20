<!-- components/Modal.vue -->
<template>
    <Teleport to="body">
        <Transition name="modal-fade">
            <div v-if="isVisible" class="modal-overlay" @click="handleOverlayClick">
                <Transition name="modal-scale">
                    <div v-if="isVisible" class="modal-container" @click.stop>
                        <!-- 图标区 -->
                        <div class="modal-icon" :class="iconColorClass">
                            <component :is="iconComponent" class="w-12 h-12" />
                        </div>

                        <!-- 标题 -->
                        <h3 class="modal-title">{{ title }}</h3>

                        <!-- 消息内容 -->
                        <p class="modal-message">{{ message }}</p>

                        <!-- 按钮区 -->
                        <div class="modal-buttons">
                            <button v-if="type === 'confirm'" @click="handleCancel" class="modal-button modal-button-cancel">
                                取消
                            </button>
                            <button @click="handleConfirm" class="modal-button modal-button-confirm" :class="confirmButtonClass">
                                {{ confirmText }}
                            </button>
                        </div>
                    </div>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
    CheckCircleIcon,
    ExclamationTriangleIcon,
    XCircleIcon,
    InformationCircleIcon
} from '@heroicons/vue/24/outline'

interface Props {
    isVisible: boolean
    type?: 'success' | 'error' | 'warning' | 'info' | 'confirm'
    title?: string
    message: string
    confirmText?: string
}

const props = withDefaults(defineProps<Props>(), {
    type: 'info',
    title: '',
    confirmText: '确定'
})

const emit = defineEmits(['confirm', 'cancel'])

const iconComponent = computed(() => {
    switch (props.type) {
        case 'success':
            return CheckCircleIcon
        case 'error':
            return XCircleIcon
        case 'warning':
        case 'confirm':
            return ExclamationTriangleIcon
        default:
            return InformationCircleIcon
    }
})

const iconColorClass = computed(() => {
    switch (props.type) {
        case 'success':
            return 'text-green-500 dark:text-green-400'
        case 'error':
            return 'text-red-500 dark:text-red-400'
        case 'warning':
        case 'confirm':
            return 'text-yellow-500 dark:text-yellow-400'
        default:
            return 'text-blue-500 dark:text-blue-400'
    }
})

const confirmButtonClass = computed(() => {
    switch (props.type) {
        case 'success':
            return 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
        case 'error':
            return 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
        case 'warning':
        case 'confirm':
            return 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500'
        default:
            return 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
    }
})

const handleConfirm = () => {
    emit('confirm')
}

const handleCancel = () => {
    emit('cancel')
}

const handleOverlayClick = () => {
    if (props.type === 'confirm') {
        emit('cancel')
    } else {
        emit('confirm')
    }
}
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 1rem;
}

.modal-container {
    background: white;
    border-radius: 1rem;
    padding: 2rem;
    max-width: 400px;
    width: 100%;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.dark .modal-container {
    background: #1f2937;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
}

.modal-icon {
    margin-bottom: 1rem;
}

.modal-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 0.75rem;
}

.dark .modal-title {
    color: #f9fafb;
}

.modal-message {
    font-size: 0.875rem;
    color: #6b7280;
    margin-bottom: 1.5rem;
    line-height: 1.5;
}

.dark .modal-message {
    color: #d1d5db;
}

.modal-buttons {
    display: flex;
    gap: 0.75rem;
    width: 100%;
}

.modal-button {
    flex: 1;
    padding: 0.625rem 1.25rem;
    border-radius: 0.5rem;
    font-weight: 600;
    font-size: 0.875rem;
    transition: all 0.2s;
    border: none;
    cursor: pointer;
}

.modal-button:focus {
    outline: none;
    ring: 2px;
    ring-offset: 2px;
}

.modal-button-cancel {
    background-color: #f3f4f6;
    color: #374151;
}

.modal-button-cancel:hover {
    background-color: #e5e7eb;
}

.dark .modal-button-cancel {
    background-color: #374151;
    color: #d1d5db;
}

.dark .modal-button-cancel:hover {
    background-color: #4b5563;
}

.modal-button-confirm {
    color: white;
}

/* 动画 */
.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
}

.modal-scale-enter-active,
.modal-scale-leave-active {
    transition: all 0.2s ease;
}

.modal-scale-enter-from,
.modal-scale-leave-to {
    opacity: 0;
    transform: scale(0.95);
}
</style>
