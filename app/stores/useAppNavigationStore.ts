export default defineStore('app-navigation', () => {
  const historyState = ref<string[]>([])
  const navigateTo = ref('')
  const collection = ref('')

  const back = computed(() =>
    historyState.value.length
      ? historyState.value[historyState.value.length - 1]
      : '/',
  )
  const previous = computed(() =>
    historyState.value.length > 1
      ? historyState.value[historyState.value.length - 2]
      : '/',
  )

  const browserHistoryBack = computed(() => history.state?.back || '/')

  const to = computed({
    get() {
      return navigateTo.value || browserHistoryBack.value
    },
    set(value: 'collection' | string) {
      navigateTo.value = 'collection' === value ? collection.value : value
    },
  })

  const clear = () => (historyState.value = [])
  const $reset = clear
  const push = (path: string) => historyState.value.push(path)
  const pop = (): string => historyState.value.pop() || '/'
  return {
    back,
    collection,
    clear,
    history: historyState,
    navigateTo,
    pop,
    push,
    previous,
    to,
    $reset,
  }
})
