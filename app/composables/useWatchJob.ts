import type { ApiResourceWorkUnit, JsonLdResourceItem } from '~~/types'

type NullableTimeout = number | NodeJS.Timeout | null

export default function (job: Ref<JsonLdResourceItem<ApiResourceWorkUnit>>) {
  const idleJobRetries = ref(0)

  const repository = useNuxtApp().$api.getWorkUnitRepository()

  const { showError } = useAppSnackbarStore()

  const timeoutId = ref<NullableTimeout>(null)
  const watchJob = async () => {
    if (idleJobRetries.value > 9) {
      showError(
        "Job is not started yet. Probably there's something wrong. Please contact your database admin",
      )
      unwatchJob()
      return
    }

    if (isTerminated(job.value)) {
      unwatchJob()
      return
    }

    job.value = await repository.fetchItem(job.value.id)
    if (isIdle(job.value)) {
      idleJobRetries.value++
    }
    timeoutId.value = setTimeout(watchJob, 500)
  }

  const unwatchJob = () => {
    if (timeoutId.value !== null) {
      clearTimeout(timeoutId.value)
      timeoutId.value = null
      idleJobRetries.value = 0
    }
  }

  const cachedJob = ref<JsonLdResourceItem<ApiResourceWorkUnit> | null>(null)
  const timeoutIdCached = ref<NullableTimeout>(null)

  const watchCachedJob = async () => {
    if (timeoutIdCached.value !== null) {
      return
    }

    if (isTerminated(job.value)) {
      unwatchCachedJob()
      return
    }

    cachedJob.value = await repository.fetchCachedItem(job.value.id, true)

    timeoutIdCached.value = setTimeout(watchCachedJob, 500)
  }

  const unwatchCachedJob = () => {
    if (timeoutIdCached.value !== null) {
      clearTimeout(timeoutIdCached.value)
      timeoutIdCached.value = null
    }
  }

  const currentStepNumber = computed<number>(() => {
    const jobNum = job.value.currentStepNumber || 0
    const cachedNum = cachedJob.value?.currentStepNumber || 0
    return Math.max(jobNum, cachedNum) + 1
  })

  return {
    watchJob,
    unwatchJob,
    watchCachedJob,
    unwatchCachedJob,
    currentStepNumber,
  }
}
