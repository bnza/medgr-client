export default defineStore('ui-app-navigation-drawer', () => {
  const visible = ref(false)
  const defaultOpened = ref<string[]>([])
  const mapOpened = ref<string[]>([])
  const toggle = () => {
    visible.value = !visible.value
  }
  return { visible, defaultOpened, mapOpened, toggle }
})
