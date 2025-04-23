<script setup lang="ts">
definePageMeta({
  middleware: ['sidebase-auth', 'acl'],
  voters: [AclVoters.HasRoleAdmin],
})
</script>

<template>
  <lazy-data-item-page mode="update" resource-key="user" code-key="code">
    <template #default="{ item, repository, resourceConfig }">
      <lazy-data-item-user-form
        mode="update"
        :item
        :repository
        :resource-config
      />
    </template>
  </lazy-data-item-page>
</template>
