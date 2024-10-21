<script setup lang="ts">
import type { ApiDataResourceKey } from '~~/types'
import { resourceCollectionFiltersInjectionKey } from '~/composables/useResourceCollectionFilters'

const props = defineProps<{ resourceKey: ApiDataResourceKey }>()

const resourceCollectionFilters = useResourceCollectionFilters(
  props.resourceKey,
)
provide(resourceCollectionFiltersInjectionKey, resourceCollectionFilters)

const { isAddFilterDialogOpen } = resourceCollectionFilters
const { label } = useResourceCollection(props.resourceKey)
</script>

<template>
  <lazy-search-add-filter-dialog v-model="isAddFilterDialogOpen" />
  <lazy-data-card :title="`Search (${label})`">
    <template #toolbar-append>
      <lazy-search-add-filter-button v-model="isAddFilterDialogOpen" />
    </template>
    <lazy-search-filters-list />
    <template #actions>
      <lazy-search-filters-list-actions />
    </template>
  </lazy-data-card>
</template>

<style scoped></style>
