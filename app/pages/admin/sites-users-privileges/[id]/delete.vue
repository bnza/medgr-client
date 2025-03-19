<script setup lang="ts">
import { DataItemPage } from '#components'
import type { ApiAclResource, ApiResourceSitesUser } from '~~/types'
definePageMeta({
  middleware: ['sidebase-auth', 'acl'],
  voters: [AclVoters.HasRoleAdmin],
})
</script>

<template>
  <component
    :is="DataItemPage<ApiResourceSitesUser & ApiAclResource>"
    mode="delete"
    resource-key="sitesUser"
    code-key="id"
  >
    <template #default="{ item, repository, resourceConfig }">
      <lazy-data-item-sites-user-form
        mode="delete"
        :item
        :repository
        :resource-config
      />
    </template>
  </component>
</template>
