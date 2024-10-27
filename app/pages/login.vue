<script setup lang="ts">
definePageMeta({
  layout: 'empty',
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/settings/me',
  },
})

const { status } = useAuth()
const { isUserAction, set, from } = useLoginRedirectFromStore()
if (!isUserAction) {
  set()
}

const router = useRouter()

if (status.value === 'authenticated') {
  router.push(from)
}
watch(status, (curr) => {
  if (curr === 'authenticated') {
    router.push(from)
  }
})
</script>

<template>
  <lazy-login-data-card />
</template>
