import type { FetchOptions } from 'ofetch'
import { stringify } from 'qs'

export function useApiFetchOptions() {
  const config = useRuntimeConfig()

  const { token } = useAuth()
  const { showError } = useAppSnackbarStore()
  const { signOut } = useAuth()

  const fetchOptions: FetchOptions = {
    baseURL: config.public.apiBaseUrl,
    onRequest({ options }) {
      if (token.value) {
        options.headers.set('Authorization', token.value)
      }
      fetchOptionsParamsToUrl(options)
    },
    onRequestError({ error }) {
      showError(error)
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        await signOut({ callbackUrl: '/login' })
      }
      showError(response)
    },
  }

  const fetchOptionsParamsToUrl = (options: Record<string, any>) => {
    if (options?.query) {
      const params =
        'fn' in options.query ? options.query.fn() : unref(options.query)
      const convertedOptions = new URLSearchParams(stringify(params))
      options.query = Object.fromEntries(convertedOptions)
    }
  }

  return fetchOptions
}
