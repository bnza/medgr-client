import type { ResourceCollectionCacheKey, Filter } from '~~/types'
import { API_FILTERS } from '~/utils/consts/filters'

export default function (resourceCacheKey: ResourceCollectionCacheKey) {
  return defineStore(`api-resource-collections:${resourceCacheKey}`, () => {
    const filtersState = ref<Record<string, Filter>>({})
    const isFiltered = computed(() =>
      Boolean(Object.keys(filtersState.value).length > 0),
    )

    const resourceFilterParams = computed(() => {
      const obj = {}
      for (const filter of Object.values(filtersState.value)) {
        API_FILTERS[filter.filter].addToObject(obj, filter)
      }
      return obj
    })

    const filters = computed(() => filtersState.value)

    const setFilters = (map: Map<string, Filter>) =>
      (filtersState.value = Object.fromEntries(map.entries()))

    return {
      filterState: readonly(filtersState),
      filters,
      isFiltered,
      resourceFilterParams,
      setFilters,
    }
  })()
}
