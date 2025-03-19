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
    mode="update"
    resource-key="sitesUser"
    code-key="id"
  >
    <template #default="{ item, repository, resourceConfig }">
      <lazy-data-item-sites-user-form
        mode="update"
        :item
        :repository
        :resource-config
      />
    </template>
  </component>
</template>
