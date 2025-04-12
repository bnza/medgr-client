<script setup lang="ts">
import type { ApiDataResourceKey } from '~~/types'

const resourceKey: ApiDataResourceKey = 'stratigraphicUnit'
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
    <template #[`item.code`]="{ item }">
      <p class="text-secondary">{{ item.code }}</p>
    </template>
    <template #[`item.site.code`]="{ item }">
      <lazy-data-item-info-box-site :id="item.site.id">
        <template #activator="{ props }">
          <lazy-data-item-info-box-chip v-bind="props" :item="item.site" />
        </template>
      </lazy-data-item-info-box-site>
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
