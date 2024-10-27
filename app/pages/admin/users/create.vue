<script setup lang="ts">
import { DataItemPage } from '#components'
import type { ApiAclResource, ApiResourceUser } from '~~/types'

definePageMeta({
  middleware: ['auth', 'acl'],
  voters: [AclVoters.HasRoleAdmin],
})
</script>

<template>
  <component
    :is="DataItemPage<ApiResourceUser & ApiAclResource>"
    resource-key="user"
    mode="create"
  >
    <template #default="{ item, repository, resourceConfig }">
      <lazy-data-item-user-form
        :mode="'create'"
        :item
        :resource-config
        :repository
      />
    </template>
  </component>
</template>
