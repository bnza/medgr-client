<script setup lang="ts">
import type {
  ApiAclResource,
  ApiDataResourceKey,
  ApiResourceImportedFile,
} from '~~/types'
import { DataItemPage } from '#components'

const resourceKey: ApiDataResourceKey = 'importedFile'
</script>

<template>
  <component
    :is="DataItemPage<ApiResourceImportedFile & ApiAclResource>"
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
  </component>
</template>
