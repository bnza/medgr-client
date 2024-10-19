<script setup lang="ts">
definePageMeta({
  layout: 'empty',
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/settings/me',
  },
})

const { isUserAction, set } = useLoginRedirectFromStore()
if (!isUserAction) {
  set()
}
</script>

<template>
  <lazy-login-data-card />
</template>
