<script setup lang="ts">
import { ApiRole } from '~/utils'

definePageMeta({
  auth: false,
})
const { hasRole } = useAppAuth()
</script>

<template>
  <lazy-data-collection-card
    resource-key="stratigraphicUnit"
    :upload-button="hasRole(ApiRole.Editor)"
  />
</template>
