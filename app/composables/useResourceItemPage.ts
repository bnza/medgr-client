import type { ApiAction, ApiDataResource, ApiDataResourceKey } from '~~/types'
import type { AsyncDataRequestStatus } from '#app'
import { isValidResourceIdRef } from '~/utils/guards'

export default function <K extends ApiDataResourceKey>(
  resourceKey: K,
  mode: ApiAction,
) {
  type ResourceType = ApiDataResource<K>
  const { fetchItem, resourceConfig, label, repository } =
    useResourceItem(resourceKey)

  const route = useRoute()
  const id = ref(routeParamId(route.params.id))

  const fetchAsyncData = () => {
    if (isValidResourceIdRef(id)) {
      return fetchItem(id).then(({ data, status, error }) => ({
        item: data as Ref<ResourceType>,
        status,
        error,
      }))
    } else {
      return Promise.resolve({
        item: ref({} as ResourceType),
        error: ref<Error | null>(
          new Error('Invalid resource ID provided by route'),
        ),
        status: ref<AsyncDataRequestStatus>('error'),
      })
    }
  }

  const getEmptyAsyncData = () =>
    Promise.resolve({
      item: ref({} as ResourceType),
      error: ref<Error | null>(null),
      status: ref<AsyncDataRequestStatus>('success'),
    })

  const getAsyncData = mode === 'create' ? getEmptyAsyncData : fetchAsyncData

  return { id, getAsyncData, label, repository, resourceConfig }
}
