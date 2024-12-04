<script setup lang="ts">
const { state } = storeToRefs(useAppUiModeStore())
</script>

<template>
  <app-bar />
  <app-navigation-drawer />
  <KeepAlive>
    <lazy-app-map v-if="state === 'map'" />
  </KeepAlive>
  <NuxtPage v-if="state === 'default'" />
</template>
