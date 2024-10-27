<script setup lang="ts">
definePageMeta({
  middleware: ['auth', 'acl'],
  voters: [AclVoters.HasRoleAdmin],
})
provide(userPasswordInjectionKey, useUserPassword())
</script>

<template>
  <lazy-data-collection-card resource-key="user" create-button />
</template>
