export default function (isConsumer = false) {
  const { to, collection, back, previous } = storeToRefs(
    useAppNavigationStore(),
  )

  const { clear, pop, push } = useAppNavigationStore()
  onBeforeRouteLeave(() => {
    if (isConsumer) {
      to.value = ''
    }
  })

  return { to, collection, back, previous, clear, pop, push }
}
