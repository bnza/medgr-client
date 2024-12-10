<script setup lang="ts">
import type { ApiDataResourceKey, ResourceCollectionCacheKey } from '~~/types'
import { resourceCollectionFiltersInjectionKey } from '~/composables/useResourceCollectionFilters'
import usePageResourceCollectionParent from '~/composables/usePageResourceCollectionParent'

const props = defineProps<{ resourceKey: ApiDataResourceKey }>()

const { parent } = usePageResourceCollectionParent(true)

const resourceCacheKey: ResourceCollectionCacheKey =
  props.resourceKey + (parent.value ? `/${parent.value[0]}` : '')

const resourceCollectionFilters = useResourceCollectionFilters(resourceCacheKey)
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
    <lazy-search-filters-list :resource-key />
    <template #actions>
      <lazy-search-filters-list-actions />
    </template>
  </lazy-data-card>
</template>
