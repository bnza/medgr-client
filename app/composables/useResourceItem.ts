import type { ApiDataResourceKey, ApiResourceItem } from '~~/types'

function useResourceItem<RT extends ApiResourceItem>(
  resourceKey: ApiDataResourceKey,
) {
  const repository = useNuxtApp().$api.getRepository<RT>(resourceKey)
  const resourceConfig = useApiResourceConfig(resourceKey)

  const label = resourceConfig.labels[0]
  const fetchItem = async (id: Ref<string | number>) => {
    const key = resourceConfig.apiPath + id.value
    return useAsyncData(key, () => repository.fetchItem(id.value), {
      watch: [id],
    })
  }

  return { fetchItem, resourceConfig, label, repository }
}

export default useResourceItem
