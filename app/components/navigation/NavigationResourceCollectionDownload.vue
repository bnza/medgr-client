<script setup lang="ts">
import type { ResourceCollectionCacheKey } from '~~/types'

const props = defineProps<{
  resourceCollectionCacheKey: ResourceCollectionCacheKey
}>()

const isDialogOpen = ref(false)
</script>

<template>
  <lazy-resource-collection-download-dialog
    v-model="isDialogOpen"
    :resource-collection-cache-key
  />
  <v-btn
    icon
    data-testid="download-resource-button"
    color="primary"
    @click="isDialogOpen = true"
  >
    <v-icon class="mx-3" v-bind="props" icon="fas fa-download" />
    <v-tooltip activator="parent" location="bottom">Download</v-tooltip>
  </v-btn>
</template>
