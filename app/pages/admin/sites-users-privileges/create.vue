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
    resource-key="sitesUser"
    mode="create"
  >
    <template #default="{ item, repository, resourceConfig, parent }">
      <lazy-data-item-sites-user-form
        :mode="'create'"
        :item
        :resource-config
        :repository
        :parent
      />
    </template>
  </component>
</template>
