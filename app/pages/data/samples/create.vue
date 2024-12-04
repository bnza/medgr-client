<script setup lang="ts">
import { DataItemPage } from '#components'
import type { ApiAclResource, ApiResourceSample } from '~~/types'
</script>

<template>
  <component
    :is="DataItemPage<ApiResourceSample & ApiAclResource>"
    resource-key="sample"
    mode="create"
  >
    <template #default="{ item, repository, resourceConfig, parent }">
      <lazy-data-item-sample-form
        :mode="'create'"
        :item
        :parent
        :repository
        :resource-config
      />
    </template>
  </component>
</template>
