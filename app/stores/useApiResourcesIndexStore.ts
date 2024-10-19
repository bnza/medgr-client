import type { ApiResourceKey } from '~~/types/api'
import type { JsonLdDocument } from '~~/types'

export default function (fetchedIndex?: JsonLdDocument) {
  return defineStore('api-resources-index', () => {
    const state = ref<Record<ApiResourceKey, string> | undefined>(undefined)
    const ready = computed(() => Boolean(state.value))

    if (fetchedIndex) {
      state.value = Object.fromEntries(
        Object.keys(fetchedIndex)
          .filter(isApiResourceKey)
          .map((key) => [key, fetchedIndex[key]]),
      ) as Record<ApiResourceKey, string>
    }

    return { index: readonly(state), ready }
  })()
}
