import type { ApiDataResourceKey } from '~~/types'

export default function (key: ApiDataResourceKey) {
  return defineStore('ui-resource-page-tab', () => {
    const store = ref<Partial<Record<ApiDataResourceKey, string>>>({})
    const tab = computed({
      get() {
        return store.value[key]
      },
      set(value: string) {
        store.value[key] = value
      },
    })
    return { state: readonly(store), tab }
  })()
}
