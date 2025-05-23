<script setup lang="ts">
import type {
  ApiResourceCollectionParent,
  ApiResourceItem,
  JsonLdResourceItem,
} from '~~/types'

const props = withDefaults(
  defineProps<{
    authorizedOnly?: boolean
    orderBy?: string | [string, 'asc' | 'desc']
    parent?: ApiResourceCollectionParent
    path: string
    watch?: ReadonlyArray<string | number>
    itemTitle?: string
  }>(),
  {
    authorizedOnly: false,
    itemTitle: 'code',
    parent: undefined,
    orderBy: () => ['id', 'asc'],
    watch: undefined,
  },
)

const items = ref<JsonLdResourceItem<ApiResourceItem>[]>([])
const search = ref('')
const orderBy = computed(() =>
  'string' === typeof props.orderBy
    ? [[props.orderBy, 'asc']]
    : [props.orderBy],
)
const params = computed(() =>
  Object.assign(
    {
      search: search.value,
      order: Object.fromEntries(orderBy.value),
      itemsPerPage: 10,
    },
    props.parent ? Object.fromEntries([props.parent]) : {},
  ),
)

const autocomplete = useNuxtApp().$api.autocomplete
const loading = ref(false)
const updateItems = async () => {
  loading.value = true
  try {
    items.value = await autocomplete.search<ApiResourceItem>(
      props.path,
      params.value,
      props.authorizedOnly,
    )
  } catch (_e) {
    items.value = []
  } finally {
    loading.value = false
  }
}

const timerId = ref<NodeJS.Timeout | number | undefined>(undefined)
const updateItemsDebounced = () => {
  // cancel pending call
  clearTimeout(timerId.value)

  // delay new call 500ms
  timerId.value = setTimeout(() => {
    updateItems()
  }, 500)
}

const modelUpdated = ref(false)
watch(
  params,
  () => {
    if (modelUpdated.value) {
      // avoid unnecessary fetch
      modelUpdated.value = false
      return
    }
    updateItemsDebounced()
  },
  { immediate: true, deep: true },
)
watch(() => props.watch, updateItems)
</script>

<template>
  <v-autocomplete
    no-filter
    return-object
    :items
    item-value="id"
    :item-title
    :loading
    @update:search="search = $event"
    @update:model-value="modelUpdated = true"
  >
    <!-- https://mokkapps.de/vue-tips/expose-slots-from-a-child-component-->
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot
        :name="name"
        v-bind="{
          ...slotProps,
          selectedItem: $attrs.modelValue,
        }"
      />
    </template>
  </v-autocomplete>
</template>
