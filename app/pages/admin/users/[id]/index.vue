<script setup lang="ts">
definePageMeta({
  middleware: ['sidebase-auth', 'acl'],
  voters: [AclVoters.HasRoleAdmin],
})
provide(userPasswordInjectionKey, useUserPassword())
</script>

<template>
  <lazy-data-item-user-page mode="read" />
</template>

<style scoped></style>
