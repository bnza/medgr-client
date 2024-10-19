<script setup lang="ts">
const props = defineProps<{
  privileges: number
}>()

const key = getSitePrivilegeKey(props.privileges)
const color = getSitePrivilegeColor(props.privileges)
</script>

<template>
  <v-btn :color icon variant="plain" data-testid="auth-user-button">
    <v-icon icon="fas fa-user" />
    <v-tooltip activator="parent" location="bottom">{{ key }}</v-tooltip>
  </v-btn>
</template>
