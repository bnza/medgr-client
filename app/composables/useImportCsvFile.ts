import type { ImportableDataResourceKey } from '~~/types'
import type { AsyncDataRequestStatus } from '#app'

const useImportCsvFile = (resourceKey: ImportableDataResourceKey) => {
  const { showError } = useAppSnackbarStore()

  const submitStatus = ref<AsyncDataRequestStatus>('idle')

  const repository = useNuxtApp().$api.getImportRepository(resourceKey)

  const importFile = async (file: File) => {
    try {
      const job = await repository.uploadFile(file)
      submitStatus.value = 'success'
      return repository.runJob(job.id)
    } catch (e) {
      submitStatus.value = 'error'
      showError(e)
    }
    return
  }

  return { submitStatus, importFile }
}

export default useImportCsvFile
