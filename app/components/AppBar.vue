<script setup lang="ts">
const store = useUiAppNavigationDrawerStore()
</script>

<template>
  <v-app-bar color="primary" height="48" flat>
    <template #prepend>
      <v-app-bar-nav-icon
        data-testid="app-bar-nav-icon"
        @click.stop="store.toggle()"
      />
    </template>
    <ui-mode-switcher />
    <template #append>
      <auth-app-bar-icon />
    </template>
  </v-app-bar>
</template>

<style scoped></style>
