<script setup lang="ts">
definePageMeta({
  middleware: ['sidebase-auth', 'acl'],
  voters: [AclVoters.HasRoleAdmin],
})
</script>

<template>
  <lazy-data-item-page mode="delete" resource-key="sitesUser" code-key="id">
    <template #default="{ item, repository, resourceConfig }">
      <lazy-data-item-sites-user-form
        mode="delete"
        :item
        :repository
        :resource-config
      />
    </template>
  </lazy-data-item-page>
</template>
