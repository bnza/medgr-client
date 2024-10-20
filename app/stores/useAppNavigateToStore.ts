export default function (isConsumer?: true) {
  return defineStore('app-navigate-to', () => {
    const store = ref('')

    onBeforeRouteLeave(() => {
      if (isConsumer) {
        store.value = ''
      }
    })

    const to = computed({
      get() {
        return store.value ? store.value : history.state?.back || '/'
      },
      set(value: 'back' | string) {
        store.value = 'back' === value ? history.state?.back || '/' : value
      },
    })
    return { state: readonly(store), to }
  })()
}
