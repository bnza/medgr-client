<script setup lang="ts">
const store = useUiAppNavigationDrawerStore();
const open = ref([]);
</script>

<template>
  <v-navigation-drawer
    :model-value="store.visible"
    :permanent="true"
    data-testid="app-navigation-drawer"
  >
    <v-list v-model:opened="open">
      <v-list-item
        nuxt
        to="/"
        router
        exact
        prepend-icon="fas fa-house"
        title="Home"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped></style>
