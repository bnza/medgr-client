<script setup lang="ts">
import type {
  ApiResourceCollectionParent,
  ApiResourceItem,
  ApiDataResourceKey,
} from '~~/types'

const props = withDefaults(
  defineProps<{
    resourceKey: ApiDataResourceKey
    parent?: ApiResourceCollectionParent
    multiSort?: boolean
  }>(),
  {
    multiSort: false,
    parent: undefined,
  },
)

const {
  headers,
  fetchCollection,
  resourceConfig,
  totalItems,
  items,
  status,
  paginationOptions,
} = useResourceFetchCollection<ApiResourceItem>(props.resourceKey, props.parent)

await fetchCollection()
const height = computed(() =>
  props.parent ? 'calc(100vh - 370px)' : 'calc(100vh - 220px)',
)
</script>

<template>
  <v-data-table-server
    :loading="status === 'pending'"
    fixed-header
    fixed-footer
    :height
    :headers
    :items
    :items-length="totalItems"
    :items-per-page="paginationOptions?.itemsPerPage"
    :items-per-page-options="[10, 25, 50, 100]"
    :page="paginationOptions?.page || 1"
    :sort-by="paginationOptions?.sortBy"
    :multi-sort
    @update:options="paginationOptions = $event"
  >
    <!-- https://mokkapps.de/vue-tips/expose-slots-from-a-child-component-->
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name v-bind="slotProps || {}" :resource-config="resourceConfig" />
    </template>
  </v-data-table-server>
</template>

<style scoped></style>
