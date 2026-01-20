import { ref } from 'vue'

interface ModalOptions {
    type?: 'success' | 'error' | 'warning' | 'info' | 'confirm'
    title?: string
    message: string
    confirmText?: string
}

const isVisible = ref(false)
const modalOptions = ref<ModalOptions>({
    type: 'info',
    title: '',
    message: '',
    confirmText: '确定'
})

let resolvePromise: ((value: boolean) => void) | null = null

export function useModal() {
    const showModal = (options: ModalOptions): Promise<boolean> => {
        modalOptions.value = {
            type: options.type || 'info',
            title: options.title || '',
            message: options.message,
            confirmText: options.confirmText || '确定'
        }
        isVisible.value = true

        return new Promise((resolve) => {
            resolvePromise = resolve
        })
    }

    const alert = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info', title?: string): Promise<boolean> => {
        return showModal({
            type,
            title,
            message
        })
    }

    const confirm = (message: string, title?: string): Promise<boolean> => {
        return showModal({
            type: 'confirm',
            title: title || '确认操作',
            message
        })
    }

    const handleConfirm = () => {
        isVisible.value = false
        if (resolvePromise) {
            resolvePromise(true)
            resolvePromise = null
        }
    }

    const handleCancel = () => {
        isVisible.value = false
        if (resolvePromise) {
            resolvePromise(false)
            resolvePromise = null
        }
    }

    return {
        isVisible,
        modalOptions,
        showModal,
        alert,
        confirm,
        handleConfirm,
        handleCancel
    }
}
