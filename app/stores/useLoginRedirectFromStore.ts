export default defineStore('login-redirect-from', () => {
  const route = useRoute()
  const from = ref('')

  // login is triggered by user action whether than the auth middleware
  const isUserAction = ref(false)
  const set = (path?: string) => {
    isUserAction.value = Boolean(path)
    from.value = path || route.redirectedFrom?.fullPath || '/'
  }
  const $reset = () => {
    isUserAction.value = false
    from.value = ''
  }
  return { from, isUserAction, set, $reset }
})
