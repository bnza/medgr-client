<script setup lang="ts">
import { DataItemPage } from '#components'
import type { ApiAclResource, ApiResourceSite } from '~~/types'
</script>

<template>
  <component
    :is="DataItemPage<ApiResourceSite & ApiAclResource>"
    mode="delete"
    resource-key="site"
    code-key="code"
  >
    <template #default="{ item, repository, resourceConfig }">
      <lazy-data-item-site-form
        mode="delete"
        :item
        :repository
        :resource-config
      />
    </template>
  </component>
</template>
