import type {
  ApiGeometricDataResourceKey,
  ApiGeometryDataResourceKey,
} from '~~/types'

export default function useResourceFetchGeometryCollection(
  key: ApiGeometricDataResourceKey,
) {
  const geometryKey: ApiGeometryDataResourceKey = `${key}Geometry`

  const repository = useNuxtApp().$api.getRepository(geometryKey)

  const { resourceFilterParams } = storeToRefs(
    useApiResourceCollectionsStore(key),
  )

  const { bboxString: bbox } = storeToRefs(useMapStore())
  const fetchCollectionParams = computed(() =>
    Object.assign({}, resourceFilterParams.value, { bbox: bbox.value }),
  )

  const fetchWithCurrentParams = () =>
    repository.fetchCollection(fetchCollectionParams.value)

  const { data, status, error, execute } = useAsyncData(
    geometryKey,
    fetchWithCurrentParams,
    {
      immediate: false, // This prevents the initial fetch
    },
  )

  // Watch for changes to params and refresh only if we've already fetched at least once
  watch(
    fetchCollectionParams,
    () => {
      if (status.value !== 'idle') {
        execute()
      }
    },
    { deep: true },
  )

  const fetchCollection = () => execute()

  return {
    data,
    status,
    error,
    fetchCollection,
    geometryKey,
  }
}
