<script setup lang="ts">
import type { ApiId } from '~~/types'

defineProps<{
  id: ApiId
}>()
</script>

<template>
  <lazy-data-item-info-box
    :id
    resource-key="site"
    data-testid="data-item-info-box-site"
  >
    <template #activator="{ props }">
      <slot name="activator" v-bind="{ props }" />
    </template>
    <template #default="{ item }">
      <v-container>
        <data-item-info-box-row label="name" :text="item.name" />
        <data-item-info-box-row label="description" :text="item.description" />
      </v-container>
    </template>
  </lazy-data-item-info-box>
</template>
