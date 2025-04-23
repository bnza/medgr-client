import type { ApiDataResourceKey } from '~~/types'

function useResourceItem<K extends ApiDataResourceKey>(resourceKey: K) {
  const api = useNuxtApp().$api

  const repository = api.getRepository(resourceKey)
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
