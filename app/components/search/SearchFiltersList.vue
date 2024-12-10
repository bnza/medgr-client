<script setup lang="ts">
import { injectResourceCollectionFilters } from '~/composables/useResourceCollectionFilters'
import type { ApiDataResourceKey } from '~~/types'

defineProps<{ resourceKey: ApiDataResourceKey }>()
const { deleteFilter, filters, isEmpty, isChanged } =
  injectResourceCollectionFilters()

const text = computed(() =>
  isChanged.value
    ? 'All filters have been removed.'
    : 'No filter selected yet. Please add new filters clicking the plus button in the top right corner',
)
const { filter: parentFilter } = usePageParentStore()
</script>

<template>
  <v-list v-if="parentFilter">
    <v-container>
      <search-filters-list-item :filter="parentFilter" is-parent />
    </v-container>
  </v-list>
  <v-empty-state
    v-if="isEmpty"
    min-height="400px"
    title="No filter selected"
    :text
  />
  <v-list v-else min-height="400px" data-testid="filters-list">
    <v-container>
      <search-filters-list-item
        v-for="filter in filters.values()"
        :key="filter.id"
        :filter
        :resource-key
        @delete-filter="deleteFilter($event)"
      />
    </v-container>
  </v-list>
</template>

<style scoped></style>
