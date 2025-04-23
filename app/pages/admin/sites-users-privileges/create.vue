<script setup lang="ts">
import { isResourceCollectionParent } from '~/utils/guards'

definePageMeta({
  middleware: ['sidebase-auth', 'acl'],
  voters: [AclVoters.HasRoleAdmin],
})
</script>

<template>
  <lazy-data-item-page resource-key="sitesUser" mode="create">
    <template #default="{ item, repository, resourceConfig, parent }">
      <lazy-data-item-sites-user-form
        v-if="isResourceCollectionParent(parent)"
        :mode="'create'"
        :item
        :resource-config
        :repository
        :parent
      />
    </template>
  </lazy-data-item-page>
</template>
