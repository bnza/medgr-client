<script setup lang="ts">
import type { ApiDataResourceKey } from '~~/types'

const resourceKey: ApiDataResourceKey = 'importedFile'
const { parseIso } = useAppDate()
</script>

<template>
  <lazy-data-collection-table :resource-key>
    <template #[`item.id`]="{ item, resourceConfig }">
      <navigation-resource-item-read
        :id="item.id"
        :app-path="resourceConfig.appPath"
      />
      <navigation-resource-collection-download-file
        :href="item.mediaObject.contentUrl"
      />
    </template>
    <template #[`item.mediaObject.originalFilename`]="{ item }">
      <a>{{ item.mediaObject.originalFilename }}</a>
    </template>
    <template #[`item.uploadDate`]="{ item }">
      <p>{{ parseIso(item.uploadDate)?.toLocaleString() }}</p>
    </template>
  </lazy-data-collection-table>
</template>
