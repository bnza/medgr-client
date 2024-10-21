import type { ApiDataResourceKey } from '~~/types'

export default function (key: ApiDataResourceKey) {
  return defineStore(`ui-resource-page-tab:${key}`, () => {
    const store = ref<Partial<Record<ApiDataResourceKey, string>>>({})
    return { tab: store }
  })()
}
