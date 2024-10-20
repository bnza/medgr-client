import type { ApiResourceItem } from '~~/types'
import type { AsyncDataRequestStatus } from '#app'

export const resourceItemSubmitInjectionKey = Symbol() as InjectionKey<
  ReturnType<typeof useResourceItemSubmit>
>

const useResourceItemSubmit = <RT extends ApiResourceItem>() => {
  const submittingItem = ref<Record<string, unknown> | undefined>(undefined)
  const submitStatus = ref<AsyncDataRequestStatus>('idle')
  const triggerSubmit = ref(false)
  return { submittingItem, submitStatus, triggerSubmit }
}

export default useResourceItemSubmit
