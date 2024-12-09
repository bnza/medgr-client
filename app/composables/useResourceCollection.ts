import type {
  ApiAclResource,
  ApiDataResourceKey,
  ApiResourceCollectionParent,
  ApiResourceItem,
  JsonLdResourceCollection,
  ResourceCollectionCacheKey,
} from '~~/types'

export type UseResourceCollection = ReturnType<typeof _useResource>
function useResourceCollection<RT extends ApiResourceItem>(
  key: ApiDataResourceKey,
  parent?: ApiResourceCollectionParent,
) {
  const cache = useNuxtApp().$cache.resourceCollections
  const resourceCollectionCacheKey: ResourceCollectionCacheKey = parent
    ? `${key}/${parent[0]}`
    : key

  if (!cache.has(resourceCollectionCacheKey)) {
    cache.set(
      resourceCollectionCacheKey,
      _useResource<RT>(resourceCollectionCacheKey, parent),
    )
  }

  const _return = cache.get(resourceCollectionCacheKey)
  if (!_return) {
    throw new Error(
      `No useResource collection found in cache for key "${resourceCollectionCacheKey}"`,
    )
  }
  if (parent) {
    _return.parent.value = parent
  }
  return _return
}

function _useResource<RT extends ApiResourceItem>(
  key: ResourceCollectionCacheKey,
  _parent?: ApiResourceCollectionParent,
) {
  const parent = ref(_parent)
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

  const {
    paginationOptions,
    queryPaginationOptionsParams,
    resourceFilterParams,
  } = storeToRefs(useApiResourceCollectionsStore(key))

  const parentObject = computed(() =>
    'undefined' === typeof parent.value
      ? {}
      : { [parent.value[0]]: parent.value[1].id },
  )

  const filteredItemsCount = ref(0)
  const fetchCollectionParams = computed(() =>
    Object.assign(
      {},
      queryPaginationOptionsParams.value,
      resourceFilterParams.value,
      parentObject.value,
    ),
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
    const items = computed(() => data.value?.['member'] || [])
    const totalItems = computed(() => data.value?.['totalItems'] || 0)
    filteredItemsCount.value = totalItems.value
    return {
      items,
      totalItems,
      status,
      paginationOptions,
      refresh,
    }
  }

  const exportCollection = () =>
    repository.exportCollection(fetchCollectionParams.value)

  return {
    collectionCacheKey: key,
    headers,
    label,
    paginationOptions,
    parent,
    exportCollection,
    filteredItemsCount: readonly(filteredItemsCount),
    fetchCollection,
    resourceConfig,
  }
}

export default useResourceCollection
