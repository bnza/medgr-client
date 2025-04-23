<script setup lang="ts">
import type { ApiDataResourceKey } from '~~/types'

const resourceKey: ApiDataResourceKey = 'importedFile'
</script>

<template>
  <lazy-data-item-page
    :resource-key
    mode="read"
    code-key="id"
    :append-icons="false"
  >
    <template #toolbar-append="{ item }">
      <lazy-navigation-resource-collection-download-file
        :href="item.mediaObject.contentUrl"
        size="large"
      />
    </template>
    <template #default="{ item, repository, resourceConfig }">
      <lazy-data-item-imported-file-form
        :item
        mode="read"
        :repository
        :resource-config
      />
    </template>
  </lazy-data-item-page>
</template>
