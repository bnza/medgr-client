<script setup lang="ts">
const store = useUiAppNavigationDrawerStore()
const open = ref([])
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
        data-testid="app-navigation-drawer-li-home"
        title="Home"
      />
      <v-list-item
        nuxt
        to="/about"
        router
        exact
        prepend-icon="fas fa-info"
        data-testid="app-navigation-drawer-li-about"
        title="About"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped></style>
