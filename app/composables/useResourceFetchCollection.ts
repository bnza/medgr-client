import type {
  ApiAclResource,
  ApiDataResourceKey,
  ApiResourceCollectionParent,
  ApiResourceItem,
  JsonLdResourceCollection,
} from '~~/types'
import type { AsyncDataRequestStatus } from '#app'
import type { AsyncDataExecuteOptions } from '#app/composables/asyncData'

export default function useResourceFetchCollection<RT extends ApiResourceItem>(
  key: ApiDataResourceKey,
  parent?: ApiResourceCollectionParent,
) {
  const { collectionCacheKey, headers, label, resourceConfig, repository } =
    useResourceCollection(key, parent)

  const {
    paginationOptions,
    queryPaginationOptionsParams,
    resourceFilterParams,
  } = storeToRefs(useApiResourceCollectionsStore(key))

  const parentObject = computed(() =>
    'undefined' === typeof parent ? {} : { [parent[0]]: parent[1].id },
  )

  const fetchCollectionParams = computed(() =>
    Object.assign(
      {},
      queryPaginationOptionsParams.value,
      resourceFilterParams.value,
      parentObject.value,
    ),
  )
  type Collection = JsonLdResourceCollection<RT> & ApiAclResource

  const collection = ref<Collection>({
    '@id': 'defaultID',
    '@type': 'defaultType',
    '@context': 'defaultContext',
    member: [],
    totalItems: 0,
    _acl: {
      canRead: true,
      canUpdate: false,
      canDelete: false,
    },
  })

  const status = ref<AsyncDataRequestStatus>('idle')

  const refresh = (opts?: AsyncDataExecuteOptions) =>
    refreshInternal.value(opts)
  const refreshInternal = ref(
    (_opts?: AsyncDataExecuteOptions): Promise<void> => Promise.resolve(),
  )

  // @TODO refine type guard
  const isCollection = (value: unknown): value is Collection =>
    isLiteralObject(value)

  const fetchInternal = () => {
    status.value = 'pending'
    return repository
      .fetch(resourceConfig.apiPath, {
        method: 'GET',
        query: fetchCollectionParams.value,
      })
      .then((data: unknown) => {
        if (isCollection(data)) {
          collection.value = data
          status.value = 'success'
          return data
        }
        status.value = 'error'
        throw new Error('Unable to fetch collection')
      })
      .catch((e) => {
        status.value = 'error'
        return e
      })
  }

  const fetchCollection = () =>
    useAsyncData<Collection>(key, fetchInternal, {
      watch: [fetchCollectionParams],
    }).then(({ refresh: _refresh }) => {
      refreshInternal.value = _refresh
    })

  const items = computed(() => collection.value?.['member'] || [])
  const totalItems = computed(() => collection.value?.['totalItems'] || 0)

  const exportCollection = () =>
    repository.exportCollection(fetchCollectionParams.value)

  return {
    collectionCacheKey,
    headers,
    items,
    label,
    exportCollection,
    fetchCollection,
    paginationOptions,
    refresh,
    resourceConfig,
    status,
    totalItems,
  }
}
