import type {
  ApiAclResource,
  ApiDataResourceKey,
  ApiResourceItem,
  JsonLdResourceCollection,
  ResourceCollectionCacheKey,
} from '~~/types'
import useApiResourceCollectionPaginationOptionsStore from '~/stores/useApiResourceCollectionPaginationOptionsStore'

function _useResource<RT extends ApiResourceItem>(
  key: ResourceCollectionCacheKey,
) {
  const resourceKey: ApiDataResourceKey = key.replace(/\/.+/, '')
  const repository = useNuxtApp().$api.getRepository<RT>(resourceKey)
  const resourceConfig = useApiResourceConfig(resourceKey)
  const label = resourceConfig.labels[1]

  const { isAuthenticated } = useAppAuth()
  const headers = computed(() => {
    const { protectedFields, defaultHeaders } = resourceConfig
    return isAuthenticated.value
      ? defaultHeaders
      : defaultHeaders.filter((h: { key?: string }) =>
          typeof h.key === 'string' && protectedFields
            ? !protectedFields.includes(h.key)
            : false,
        )
  })
  const { paginationOptions, queryPaginationOptionsParams } = storeToRefs(
    useApiResourceCollectionPaginationOptionsStore(key),
  )

  const fetchCollectionParams = computed(() =>
    Object.assign({}, queryPaginationOptionsParams.value),
  )
  type Collection = JsonLdResourceCollection<RT> & ApiAclResource
  const fetchCollection = async () => {
    const { data, status, refresh } = await useAsyncData<Collection>(
      key,
      () =>
        repository.fetch(resourceConfig.apiPath, {
          method: 'GET',
          query: fetchCollectionParams.value,
        }),
      { watch: [fetchCollectionParams] },
    )
    const items = computed(() => data.value?.['hydra:member'] || [])
    const totalItems = computed(() => data.value?.['hydra:totalItems'] || 0)
    return {
      items,
      totalItems,
      status,
      paginationOptions,
      refresh,
    }
  }

  return { headers, label, paginationOptions, fetchCollection, resourceConfig }
}

export default _useResource
