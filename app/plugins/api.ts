import { useApiFetchOptions } from '~/composables/api/useApiFetchOptions'
import Api from '~/utils/repository/Api'
import type { ApiResourceKey } from '~~/types'
const isValidIndex = (
  configs: Record<ApiResourceKey, string> | undefined,
): configs is Record<ApiResourceKey, string> => Boolean(configs)
export default defineNuxtPlugin({
  name: 'api',
  dependsOn: ['api-index'],
  setup() {
    const { index } = useApiResourcesIndexStore()
    if (!isValidIndex(index)) {
      console.error('api-index plugin not called yet')
      return
    }
    const fetchOptions = useApiFetchOptions()
    const api = new Api(index, fetchOptions)
    return {
      provide: {
        api,
      },
    }
  },
})
