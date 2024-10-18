export default defineStore('ui-app-navigation-drawer', () => {
    const visible = ref(false)
    const toggle = () => {visible.value = !visible.value}
    return {visible, toggle}
})