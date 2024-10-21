import type { ResourceCollectionCacheKey, Filter } from '~~/types'
export const resourceCollectionFiltersInjectionKey = Symbol() as InjectionKey<
  ReturnType<typeof useResourceCollectionFilters>
>

export function injectResourceCollectionFilters() {
  const injected = inject(resourceCollectionFiltersInjectionKey)
  if ('undefined' === typeof injected) {
    throw new Error('Invalid injection request')
  }
  return injected
}
function useResourceCollectionFilters(
  resourceCacheKey: ResourceCollectionCacheKey,
) {
  const { increment } = useGlobalSequenceStore()
  const { filters: state, setFilters } =
    useApiResourceCollectionsStore(resourceCacheKey)

  const resourceKey = extractResourceKeyFromCacheKey(resourceCacheKey)

  const filters = reactive(new Map(Object.entries(state)))
  const isChanged = ref(false)
  const isEmpty = computed(() => Array.from(filters.keys()).length === 0)
  const isAddFilterDialogOpen = ref(false)

  // Protected fields
  let resourceConfig = useNuxtApp().$cache.resourceConfigs.get(resourceKey)
  if ('undefined' === typeof resourceConfig) {
    const { resourceConfig: _resourceConfig } =
      useResourceCollection(resourceCacheKey)
    resourceConfig = _resourceConfig
  }
  const { isAuthenticated } = useAppAuth()
  const protectedFields = computed(() =>
    isAuthenticated.value ? [] : resourceConfig.protectedFields || [],
  )

  const availableProperties = computed(() =>
    getResourceAvailableProps(resourceCacheKey, state, protectedFields.value),
  )
  const getAvailableOperators = (prop: string) =>
    getPropertyAvailableOperators(resourceCacheKey, [...filters.values()], prop)
  const setFilter = (filter: Filter) => {
    filter = clone(toRaw(filter))
    filter.id = filter.id || String(increment())
    filters.set(filter.id, filter)
  }

  const deleteFilter = (filter: Filter) => {
    if (filter.id && filters.has(filter.id)) {
      filters.delete(filter.id)
    }
  }
  const clearFilters = () => {
    filters.clear()
  }

  watch(filters, () => {
    isChanged.value = true
  })

  const router = useRouter()
  const setFiltersAndClose = () => {
    setFilters(filters)
    if (history.state.back) {
      return router.replace(history.state.back)
    }
    return router.replace(resourceConfig.appPath)
  }

  return {
    availableProperties,
    clearFilters,
    deleteFilter,
    filters,
    getAvailableOperators,
    isAddFilterDialogOpen,
    isChanged,
    isEmpty,
    resourceConfig,
    setFilter,
    setFiltersAndClose,
  }
}

export default useResourceCollectionFilters
