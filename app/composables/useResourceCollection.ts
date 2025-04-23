import type {
  ApiDataResourceKey,
  ApiResourceCollectionParent,
  ApiResourceItem,
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
  return _return
}

function _useResource<RT extends ApiResourceItem>(
  key: ResourceCollectionCacheKey,
  _parent?: ApiResourceCollectionParent,
) {
  // const parent = ref(_parent)
  const resourceKey: ApiDataResourceKey = key.replace(/\/.+/, '')
  const repository = useNuxtApp().$api.getRepository(resourceKey)
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

  return {
    collectionCacheKey: key,
    headers,
    label,
    resourceConfig,
    repository,
  }
}

export default useResourceCollection
