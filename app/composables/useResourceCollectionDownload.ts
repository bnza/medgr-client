import type { ResourceCollectionCacheKey } from '~~/types'
import type { AsyncDataRequestStatus } from '#app'

export const downloadCsv = (resourceName: string, data: string) => {
  const fileURL = window.URL.createObjectURL(new Blob([data]))
  const fileLink = document.createElement('a')
  fileLink.href = fileURL
  fileLink.setAttribute('download', `export-${resourceName}.csv`)
  document.body.appendChild(fileLink)
  fileLink.click()
  fileLink.remove()
}

export default function (
  resourceCollectionCacheKey: ResourceCollectionCacheKey,
) {
  const {
    label,
    totalItems: filteredItemsCount,
    exportCollection,
  } = useResourceFetchCollection(resourceCollectionCacheKey)
  const status = ref<AsyncDataRequestStatus>('idle')
  const { showSuccess } = useAppSnackbarStore()

  const downloadAndFeedback = async () => {
    status.value = 'pending'
    try {
      const data = await exportCollection()
      downloadCsv(resourceCollectionCacheKey.replace(/\/(.+)$/, ''), data)
      showSuccess('Data successfully downloaded')
      status.value = 'success'
    } catch (e) {
      status.value = 'error'
      return e
    }
  }

  return {
    label,
    status,
    filteredItemsCount,
    downloadAndFeedback,
  }
}
