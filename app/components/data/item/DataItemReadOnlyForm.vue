<script setup lang="ts">
import type { ApiResourceItem, ResourceConfig } from '~~/types'
import type ResourceRepository from '~/utils/repository/ResourceRepository'

const props = defineProps<{
  item: ApiResourceItem
  repository: ResourceRepository<ApiResourceItem>
  resourceConfig: ResourceConfig
}>()
</script>

<template>
  <v-form class="mx-4" readonly data-testid="data-item-form" @submit.prevent>
    <v-container>
      <slot />
    </v-container>
  </v-form>
</template>

<style scoped></style>
