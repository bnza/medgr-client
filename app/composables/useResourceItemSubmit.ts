import type { AsyncDataRequestStatus } from '#app'

export const resourceItemSubmitInjectionKey = Symbol() as InjectionKey<
  ReturnType<typeof useResourceItemSubmit>
>

export const injectResourceItemSubmit = () => {
  const injected = inject(resourceItemSubmitInjectionKey)
  if ('undefined' === typeof injected) {
    throw new Error('Invalid injection request')
  }
  return injected
}
const useResourceItemSubmit = () => {
  const submittingItem = ref<Record<string, unknown> | undefined>(undefined)
  const submitStatus = ref<AsyncDataRequestStatus>('idle')
  const triggerSubmit = ref(false)
  return { submittingItem, submitStatus, triggerSubmit }
}

export default useResourceItemSubmit
