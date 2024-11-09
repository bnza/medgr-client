import type {
  ApiDataResourceKey,
  ApiResourceCollectionParent,
  ApiResourceMediaObjectJoin,
} from '~~/types'
import type { AsyncDataRequestStatus } from '#app'

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
  const { paginationOptions, fetchCollection } =
    useResourceCollection<ApiResourceMediaObjectJoin>(resourceKey, parent)

  paginationOptions.value = Object.assign({}, paginationOptions.value, {
    itemsPerPage: -1,
  })

  const { items, refresh, status: fetchStatus } = await fetchCollection()

  const repository = useNuxtApp().$api.getRepository(
    'stratigraphicUnitsMediaObject',
  )
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
    } catch (e) {
      submitStatus.value = 'error'
      showError(e)
    }
  }

  const createAndFeedback = async (item: { item: string; file: File }) => {
    submitStatus.value = 'pending'
    const formData = new FormData()
    formData.append('item', item.item)
    formData.append('file', item.file)
    try {
      await repository.postItem(formData, 'multipart/form-data')
      refresh()
      submitStatus.value = 'success'
      showSuccess('Successfully created media')
    } catch (e) {
      submitStatus.value = 'error'
      showError(e)
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
