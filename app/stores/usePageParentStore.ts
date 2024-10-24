import type { ApiResourceCollectionParent, Filter } from '~~/types'

export default defineStore('search-parent', () => {
  const parent = ref<ApiResourceCollectionParent | undefined>(undefined)

  const operands = computed(() => {
    if (!parent.value) {
      return ['']
    }
    switch (parent.value[0]) {
      default:
        return [parent.value[1].code] as string[]
    }
  })

  // @TODO move to his own composable
  const filter = computed<Filter | undefined>(() => {
    if (!parent.value) {
      return
    }
    return {
      id: '__parent__',
      property: parent.value[0],
      filter: 'SearchExact',
      operands: operands.value,
    }
  })

  return { parent, filter }
})
