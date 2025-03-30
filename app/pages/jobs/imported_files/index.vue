<script setup lang="ts">
definePageMeta({
  middleware: ['sidebase-auth', 'acl'],
  voters: [AclVoters.HasRoleEditor],
})
</script>

<template>
  <lazy-data-collection-card
    resource-key="importedFile"
    :search-button="false"
    :download-button="false"
  />
</template>
