<script setup lang="ts">
definePageMeta({
  middleware: ['sidebase-auth', 'acl'],
  voters: [AclVoters.HasRoleAdmin],
})
</script>

<template>
  <lazy-data-item-page resource-key="user" mode="create">
    <template #default="{ item, repository, resourceConfig }">
      <lazy-data-item-user-form
        :mode="'create'"
        :item
        :resource-config
        :repository
      />
    </template>
  </lazy-data-item-page>
</template>
