import type { AppSnackbarState } from '~~/types'
import type { FetchResponse } from 'ofetch'

const defaultValue: AppSnackbarState = {
  visible: true,
  vertical: false,
  text: '',
  color: 'info',
  timeout: -1,
  multiline: false,
} as const

export default defineStore('app-snackbar', () => {
  const { increment } = useGlobalSequenceStore()
  const stack = ref<Record<number, AppSnackbarState>>({})
  const set = (value: AppSnackbarState) => {
    const key = increment()
    stack.value[key] = value
    return key
  }
  const unset = (key: number) => {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete stack.value[key]
  }

  const showSuccess = (value: Pick<AppSnackbarState, 'text'> | string) => {
    if ('string' === typeof value) {
      value = { text: value }
    }
    set(
      Object.assign(
        {},
        defaultValue,
        { color: 'success', timeout: 5000 },
        value,
      ),
    )
  }

  const showError = (value: unknown) => {
    let values: string[] = []
    if (isFetchResponse(value)) {
      values = responseErrorToString(value)
    }

    if (value instanceof Error) {
      values = [value.message]
    }

    if ('string' === typeof value) {
      values = [value]
    }

    if (values.length === 0) {
      throw new Error(`Unsupported fetch response: ${typeof value}`)
    }

    values.forEach((text) => {
      set(
        Object.assign(
          {},
          defaultValue,
          { color: 'error', timeout: -1 },
          { text },
        ),
      )
    })
  }

  const snackbars = computed(() => Object.entries(stack.value))

  const getMargin = (key: string) => {
    const index = snackbars.value.findIndex((current) => current[0] == key)
    return index * 60
  }
  return { getMargin, set, showError, showSuccess, snackbars, stack, unset }
})
