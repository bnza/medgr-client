<script setup lang="ts">
import { DataItemPage } from '#components'
import type { ApiAclResource, ApiResourceUser } from '~~/types'
definePageMeta({
  middleware: ['sidebase-auth', 'acl'],
  voters: [AclVoters.HasRoleAdmin],
})
</script>

<template>
  <component
    :is="DataItemPage<ApiResourceUser & ApiAclResource>"
    mode="update"
    resource-key="user"
    code-key="code"
  >
    <template #default="{ item, repository, resourceConfig }">
      <lazy-data-item-user-form
        mode="update"
        :item
        :repository
        :resource-config
      />
    </template>
  </component>
</template>
