<script setup lang="ts">
import { DataItemPage } from '#components'
import type { ApiAclResource, ApiResourceSite } from '~~/types'
</script>

<template>
  <component
    :is="DataItemPage<ApiResourceSite & ApiAclResource>"
    resource-key="site"
    mode="create"
  >
    <template #default="{ item, repository, resourceConfig }">
      <lazy-data-item-site-form
        :mode="'create'"
        :item
        :resource-config
        :repository
      />
    </template>
  </component>
</template>
