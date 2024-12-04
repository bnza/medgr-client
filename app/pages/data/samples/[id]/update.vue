<script setup lang="ts">
import { DataItemPage } from '#components'
import type { ApiAclResource, ApiResourceSample } from '~~/types'
</script>

<template>
  <component
    :is="DataItemPage<ApiResourceSample & ApiAclResource>"
    mode="update"
    resource-key="sample"
    code-key="code"
  >
    <template #default="{ item, repository, resourceConfig }">
      <lazy-data-item-sample-form
        mode="update"
        :item
        :repository
        :resource-config
      />
    </template>
  </component>
</template>
