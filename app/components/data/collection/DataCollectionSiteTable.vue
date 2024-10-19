<script setup lang="ts">
import type { ApiDataResourceKey } from '~~/types'

const resourceKey: ApiDataResourceKey = 'site'
</script>

<template>
  <lazy-data-collection-table :resource-key>
    <template #[`item.id`]="{ item, resourceConfig }">
      <navigation-resource-item
        :id="item.id"
        :acl="item._acl"
        :app-path="resourceConfig.appPath"
      />
    </template>
    <template #[`item.public`]="{ item }">
      <v-checkbox-btn
        density="compact"
        :inline="true"
        :readonly="true"
        :model-value="item.public"
      />
    </template>
  </lazy-data-collection-table>
</template>
