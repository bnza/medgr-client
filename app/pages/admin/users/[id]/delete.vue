<script setup lang="ts">
import { DataItemPage } from '#components'
import type { ApiAclResource, ApiResourceUser } from '~~/types'
</script>

<template>
  <component
    :is="DataItemPage<ApiResourceUser & ApiAclResource>"
    mode="delete"
    resource-key="user"
    code-key="email"
  >
    <template #default="{ item, repository, resourceConfig }">
      <lazy-data-item-user-form
        mode="delete"
        :item
        :repository
        :resource-config
      />
    </template>
  </component>
</template>
