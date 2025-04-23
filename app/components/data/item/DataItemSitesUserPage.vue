<script setup lang="ts">
import type { ApiDataResourceKey } from '~~/types'
const resourceKey: ApiDataResourceKey = 'sitesUser'
</script>

<template>
  <lazy-data-item-page :resource-key mode="read" code-key="id">
    <template #default="{ item, repository, resourceConfig }">
      <lazy-data-item-sites-user-form
        v-if="item"
        :item="item"
        :repository
        :resource-config
        mode="read"
      />
    </template>
  </lazy-data-item-page>
</template>
