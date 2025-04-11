<script setup lang="ts">
import type { ApiId, ApiResourceSite, ResourceConfig } from '~~/types'
import { DataItemInfoBox } from '#components'

defineProps<{
  id: ApiId
}>()
</script>

<template>
  <component :is="DataItemInfoBox<ApiResourceSite>" :id resource-key="site">
    <template #default="{ item }">
      <v-container>
        <data-item-info-box-row label="name" :text="item.name" />
        <data-item-info-box-row label="description" :text="item.description" />
      </v-container>
    </template>
  </component>
</template>
