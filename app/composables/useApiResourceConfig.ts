import type {
  ApiId,
  ApiResourceKey,
  ReadonlyHeaders,
  ResourceConfig,
} from '~~/types'
import { resources } from '~/utils/resources'

function useApiResourceConfig(key: ApiResourceKey): ResourceConfig
function useApiResourceConfig(): {
  getResourceConfig: (key: ApiResourceKey) => ResourceConfig
  getResourceIri: (key: ApiResourceKey) => (id: ApiId) => string
}

function useApiResourceConfig(key?: ApiResourceKey) {
  const cache = useNuxtApp().$cache.resourceConfigs
  const { index } = useApiResourcesIndexStore()

  if (!index) {
    throw new Error('Resource index not initialized')
  }
  const getResourceIri = (key: ApiResourceKey) => (id: ApiId) =>
    `${index[key]}/${id}`

  const getResourceConfig = (key: ApiResourceKey) => {
    if (!cache.has(key)) {
      const resourceConfig: ResourceConfig = Object.freeze(
        Object.assign(
          {
            name: key,
            apiPath: index[key],
            appPath: '/',
            labels: [key, key],
            protectedFields: [],
            defaultHeaders: [] as ReadonlyHeaders,
          },
          resources[key],
        ),
      )
      cache.set(key, resourceConfig)
    }
    return cache.get(key)
  }
  return key ? getResourceConfig(key) : { getResourceConfig, getResourceIri }
}
export default useApiResourceConfig
