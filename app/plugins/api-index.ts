import { defineNuxtPlugin } from '#app'
import type { JsonLdDocument } from '~~/types'

export default defineNuxtPlugin({
  name: 'api-index',
  async setup() {
    const { showError } = useAppSnackbarStore()

    const config = useRuntimeConfig()
    await callOnce(async () => {
      try {
        const index = await $fetch<JsonLdDocument>(
          `${config.public.apiBaseUrl}/api/index.jsonld`,
        )
        useApiResourcesIndexStore(index)
      } catch (e) {
        console.error(e)
        showError('API problem. Please contact your server administrator')
      }
    })
  },
})
