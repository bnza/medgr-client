<script setup lang="ts">
import type { ApiDataResourceKey } from '~~/types'

const resourceKey: ApiDataResourceKey = 'user'
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
    <template #[`item.roles`]="{ item }">
      {{ reduceAppRoles(item.roles) }}
    </template>
  </lazy-data-collection-table>
</template>
