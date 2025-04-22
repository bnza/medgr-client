<script setup lang="ts">
const uiAppNavigationDrawerStore = useUiAppNavigationDrawerStore()

const { mapOpened, visible } = storeToRefs(uiAppNavigationDrawerStore)
</script>

<template>
  <v-navigation-drawer
    :model-value="visible"
    :permanent="true"
    data-testid="app-map-navigation-drawer"
  >
    <v-list v-model:opened="mapOpened">
      <v-list-group value="Data">
        <template #activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="fas fa-table-list"
            title="Data"
            data-testid="app-map-nav-drawer-li-data"
          />
        </template>
        <v-list-item title="Sites" data-testid="app-map-nav-drawer-li-sites" />
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>
