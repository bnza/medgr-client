<script setup lang="ts">
import type {
  ApiResourceCollectionParent,
  ApiResourceItem,
  ApiDataResourceKey,
  JsonLdResourceItem,
} from '~~/types'
import type { AsyncDataRequestStatus } from '#app'

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

const { headers, fetchCollection, resourceConfig } =
  useResourceCollection<ApiResourceItem>(props.resourceKey, props.parent)

const results = ref({
  totalItems: ref(0),
  items: ref([] as JsonLdResourceItem<ApiResourceItem>[]),
  status: ref('pending' as AsyncDataRequestStatus),
})

fetchCollection().then((_results) => (results.value = _results))
</script>

<template>
  <v-data-table-server
    :loading="results.status === 'pending'"
    fixed-header
    fixed-footer
    height="calc(100vh - 300px)"
    :headers
    :items="results.items"
    :items-length="results.totalItems"
    :items-per-page="results.paginationOptions?.itemsPerPage"
    :items-per-page-options="[10, 25, 50, 100]"
    :page="results.paginationOptions?.page || 1"
    :sort-by="results.paginationOptions?.sortBy"
    :multi-sort
    @update:options="results.paginationOptions = $event"
  >
    <!-- https://mokkapps.de/vue-tips/expose-slots-from-a-child-component-->
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name v-bind="slotProps || {}" :resource-config="resourceConfig" />
    </template>
  </v-data-table-server>
</template>

<style scoped></style>
