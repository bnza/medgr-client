import type { ImportableDataResourceKey } from '~~/types'
import type { AsyncDataRequestStatus } from '#app'

const useImportCsvFile = (resourceKey: ImportableDataResourceKey) => {
  const { showError } = useAppSnackbarStore()

  const submitStatus = ref<AsyncDataRequestStatus>('idle')

  const repository = useNuxtApp().$api.getImportRepository(resourceKey)

  const importFile = async ({
    file,
    description,
  }: {
    file: File
    description: string | undefined
  }) => {
    try {
      submitStatus.value = 'pending'
      const job = await repository.uploadFile(file, description)
      return repository.runJob(job.id).then((job) => {
        submitStatus.value = 'success'
        return job
      })
    } catch (e) {
      submitStatus.value = 'error'
      showError(e)
    }
    return
  }

  return { submitStatus, importFile }
}

export default useImportCsvFile
