import type {
  ResourceCollectionCacheKey,
  Filter,
  PaginationOptionsState,
} from '~~/types'
import { API_FILTERS } from '~/utils/consts/filters'
import { structuredClone } from 'structured-clone-es'

const defaultPaginationOptions: PaginationOptionsState = {
  page: 1,
  itemsPerPage: 10,
  sortBy: [
    {
      key: 'id',
      order: 'asc',
    },
  ],
  groupBy: [],
}

export const getDefaultPaginationOptions = () =>
  structuredClone(defaultPaginationOptions)
export default function (resourceCacheKey: ResourceCollectionCacheKey) {
  return defineStore(`api-resource-collections:${resourceCacheKey}`, () => {
    /**
     * PaginationOptions
     */
    const paginationOptionsState = ref<PaginationOptionsState>(
      structuredClone(defaultPaginationOptions) as PaginationOptionsState,
    )

    const vuetifyPaginationOptionToQsObject = (
      componentPaginationOptions: PaginationOptionsState,
    ) => {
      const paginationOptions = Object.assign({}, componentPaginationOptions)
      if (paginationOptions.itemsPerPage === -1) {
        delete paginationOptions.itemsPerPage
      }
      const order: Record<string, 'asc' | 'desc'> = {}
      paginationOptions.sortBy?.forEach((sortItem) => {
        order[sortItem.key] = sortItem?.order || 'asc'
      })
      return {
        order,
        page: paginationOptions.page,
        itemsPerPage: paginationOptions.itemsPerPage,
      }
    }

    const paginationOptions = computed<PaginationOptionsState>({
      get() {
        return paginationOptionsState.value
      },
      set(value) {
        if (
          JSON.stringify(value) !== JSON.stringify(paginationOptionsState.value)
        ) {
          paginationOptionsState.value = value
        }
      },
    })

    const queryPaginationOptionsParams = computed(() =>
      vuetifyPaginationOptionToQsObject(paginationOptionsState.value),
    )

    /**
     * Filters
     */
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
      paginationOptionsState: readonly(paginationOptionsState),
      paginationOptions,
      queryPaginationOptionsParams,
      filterState: readonly(filtersState),
      filters,
      isFiltered,
      resourceFilterParams,
      setFilters,
    }
  })()
}
