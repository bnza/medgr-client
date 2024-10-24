<script setup lang="ts">
import type { ApiResourceCollectionParent, ResourceConfig } from '~~/types'
import usePageResourceCollectionParent from '~/composables/usePageResourceCollectionParent'

const props = defineProps<{
  resourceConfig: ResourceConfig
  parent?: ApiResourceCollectionParent
}>()
const { parent: parentState } = usePageResourceCollectionParent()
</script>

<template>
  <v-btn
    :icon="true"
    nuxt
    :to="`${props.resourceConfig.appPath}/search`"
    variant="text"
    data-testid="collection-search-link"
    @click="parentState = parent"
  >
    <v-icon color="anchor" icon="fas fa-magnifying-glass" size="small" />
    <v-tooltip activator="parent" location="bottom">Search</v-tooltip>
  </v-btn>
</template>
