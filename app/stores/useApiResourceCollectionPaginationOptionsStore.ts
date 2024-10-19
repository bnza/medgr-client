import type { ResourceCollectionCacheKey } from '~~/types'
type PaginationOptionsState = {
  itemsPerPage?: number
  page: number
  search?: string
  groupBy: Array<string>
  sortBy?: Array<{ key: string; order: 'asc' | 'desc' }>
}
const defaultPaginationOptions: PaginationOptionsState = {
  page: 1,
  itemsPerPage: 10,
  sortBy: [
    {
      key: 'id',
      order: 'asc', //?
    },
  ],
  groupBy: [],
}

export default function (resourceCacheKey: ResourceCollectionCacheKey) {
  return defineStore(
    `api-resource-collection-pagination-options:${resourceCacheKey}`,
    () => {
      const state = ref<PaginationOptionsState>(
        structuredClone(defaultPaginationOptions),
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

      const paginationOptions = computed({
        get() {
          return state.value
        },
        set(value) {
          if (JSON.stringify(value) !== JSON.stringify(state.value)) {
            state.value = value
          }
        },
      })

      const queryPaginationOptionsParams = computed(() =>
        vuetifyPaginationOptionToQsObject(state.value),
      )
      return { state, paginationOptions, queryPaginationOptionsParams }
    },
  )()
}
