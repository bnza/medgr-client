import type { AsyncDataRequestStatus } from '#app'

const useImportCsvFile = () => {
  const { showError } = useAppSnackbarStore()

  const submitStatus = ref<AsyncDataRequestStatus>('idle')

  const repository = useNuxtApp().$api.getWorkUnitRepository()

  const fetchItem = async (id: string) => {
    try {
      const job = await repository.fetchItem(id)
      submitStatus.value = 'success'
      return repository.runJob(job.id)
    } catch (e) {
      submitStatus.value = 'error'
      showError(e)
    }
    return
  }

  return { submitStatus, fetchItem }
}

export default useImportCsvFile
