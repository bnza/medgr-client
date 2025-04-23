import type { ApiDataResourceKey } from '~~/types'

function useResourceFetchGeoJson(resourceKey: ApiDataResourceKey) {
  const repository = useNuxtApp().$api.getRepository(resourceKey)
}

export default useResourceFetchGeoJson
