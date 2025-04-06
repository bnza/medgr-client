import type {
  ApiDataResourceKey,
  ApiResourceCollectionParent,
  ApiResourceMediaObjectJoin,
} from '~~/types'
import type { AsyncDataRequestStatus } from '#app'
import { isFetchResponse } from '~/utils/guards'

export const mediaObjectJoinInjectionKey = Symbol() as InjectionKey<
  Awaited<ReturnType<typeof useMediaObjectJoin>>
>
export function injectMediaObjectJoin() {
  const injected = inject(mediaObjectJoinInjectionKey)
  if ('undefined' === typeof injected) {
    throw new Error('Invalid injection request')
  }
  return injected
}
const useMediaObjectJoin = async (
  resourceKey: ApiDataResourceKey,
  parent: ApiResourceCollectionParent,
) => {
  const {
    paginationOptions,
    fetchCollection,
    items,
    refresh,
    status: fetchStatus,
  } = useResourceFetchCollection<ApiResourceMediaObjectJoin>(
    resourceKey,
    parent,
  )

  paginationOptions.value = Object.assign({}, paginationOptions.value, {
    itemsPerPage: -1,
  })

  await fetchCollection()

  const repository = useNuxtApp().$api.getRepository(resourceKey)
  const { showSuccess, showError } = useAppSnackbarStore()

  const submitStatus = ref<AsyncDataRequestStatus>('idle')

  const deletingItem = ref<ApiResourceMediaObjectJoin | undefined>(undefined)
  const deleteAndFeedback = async () => {
    if (!isApiResourceItem(deletingItem.value)) {
      console.error('deletingItem is not set')
      return
    }
    submitStatus.value = 'pending'
    try {
      await repository.deleteItem(deletingItem.value)
      await refresh()
      submitStatus.value = 'success'
      showSuccess('Successfully deleted media')
      deletingItem.value = undefined
    } catch (e: unknown) {
      submitStatus.value = 'error'
      if (typeof e === 'string' || e instanceof Error || isFetchResponse(e)) {
        showError(e)
      }
    }
  }

  const createAndFeedback = async (item: {
    item: string
    file: File
    description?: string
  }) => {
    submitStatus.value = 'pending'
    const formData = new FormData()
    formData.append('item', item.item)
    formData.append('file', item.file)
    if (item.description) {
      formData.append('description', item.description)
    }
    try {
      await repository.postItem(formData, 'multipart/form-data')
      submitStatus.value = 'success'
      showSuccess('Successfully created media')
      await refresh()
    } catch (_e: unknown) {
      submitStatus.value = 'error'
    }
  }

  return {
    createAndFeedback,
    deletingItem,
    deleteAndFeedback,
    items,
    fetchStatus,
    submitStatus,
  }
}

export default useMediaObjectJoin
