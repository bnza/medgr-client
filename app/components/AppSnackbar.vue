<script setup lang="ts">
const { snackbars } = storeToRefs(useAppSnackbarStore())
const { unset, getMargin } = useAppSnackbarStore()
</script>

<template>
  <v-snackbar
    v-for="[key, { text, timeout, visible, color }] in snackbars"
    :key
    data-testid="app-snackbar"
    :style="`margin-top: ${getMargin(key)}px`"
    :model-value="visible"
    close-on-content-click
    :color
    location="top"
    :text
    :timeout
    @update:model-value="unset(Number(key))"
  />
</template>
