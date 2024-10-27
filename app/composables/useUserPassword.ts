import type { AsyncDataRequestStatus } from '#app'
import type { ApiId, UserChangePasswordBody } from '~~/types'

export function injectUserPassword() {
  const injected = inject(userPasswordInjectionKey)
  if ('undefined' === typeof injected) {
    throw new Error('Invalid injection request')
  }
  return injected
}
export const userPasswordInjectionKey = Symbol() as InjectionKey<
  ReturnType<typeof useUserPassword>
>
const useUserPassword = () => {
  const { plainPassword } = storeToRefs(useUserPlainPasswordStore())

  const _isPasswordDialogOpen = ref(false)
  const isPasswordDialogOpen = computed({
    get() {
      return _isPasswordDialogOpen.value || Boolean(plainPassword.value)
    },
    set(flag: boolean) {
      _isPasswordDialogOpen.value = flag
      if (!flag) {
        plainPassword.value = ''
      }
    },
  })

  const submitStatus = ref<AsyncDataRequestStatus>('idle')

  const { showError, showSuccess } = useAppSnackbarStore()
  const repository = useNuxtApp().$api.userRepository
  const resetPassword = async (id: ApiId) => {
    const newPlainPassword = generatePassword()
    submitStatus.value = 'pending'
    try {
      await repository.patchItem(id, { plainPassword: newPlainPassword })
      plainPassword.value = newPlainPassword
      submitStatus.value = 'success'
      showSuccess('Successfully reset password')
    } catch (e) {
      submitStatus.value = 'error'
      showError(String(e))
    }
  }

  const changePassword = async (body: UserChangePasswordBody) => {
    submitStatus.value = 'pending'
    try {
      await repository.changeUserPassword(body)
      submitStatus.value = 'success'
      showSuccess('Successfully changed password')
      isPasswordDialogOpen.value = false
    } catch (e) {
      submitStatus.value = 'error'
      showError(String(e))
    }
  }
  return {
    changePassword,
    plainPassword,
    isPasswordDialogOpen,
    resetPassword,
    submitStatus,
  }
}

export default useUserPassword
