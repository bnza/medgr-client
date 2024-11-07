<script setup lang="ts">
definePageMeta({
  middleware: ['auth', 'acl'],
  voters: [AclVoters.HasRoleAdmin],
})
</script>

<template>
  <lazy-data-item-sites-user-page mode="read" />
</template>

<style scoped></style>
