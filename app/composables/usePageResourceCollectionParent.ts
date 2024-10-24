export default function (isConsumerPage = false) {
  const { parent } = storeToRefs(usePageParentStore())

  onBeforeRouteLeave(() => {
    if (isConsumerPage) {
      parent.value = undefined
    }
  })
  return { parent }
}
