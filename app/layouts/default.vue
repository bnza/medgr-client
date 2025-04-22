<script setup lang="ts">
const { state } = storeToRefs(useAppUiModeStore())
</script>

<template>
  <app-bar />
  <app-map-navigation-drawer v-if="state === 'map'" />
  <app-data-navigation-drawer v-else />
  <KeepAlive>
    <Suspense v-if="state === 'map'">
      <template #default>
        <lazy-app-map />
      </template>
      <template #fallback>
        <loading-component />
      </template>
    </Suspense>
  </KeepAlive>
  <NuxtPage v-if="state === 'default'" />
</template>
