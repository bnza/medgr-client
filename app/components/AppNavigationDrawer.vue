<script setup lang="ts">
const store = useUiAppNavigationDrawerStore()
const { hasRoleAdmin, hasRole } = useAppAuth()
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
      <v-list-group value="Data">
        <template #activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="fas fa-table-list"
            title="Data"
            data-testid="app-nav-drawer-li-data"
          />
        </template>
        <v-list-item
          nuxt
          to="/data/micro-stratigraphic-units"
          router
          title="Microstratigraphic Unit"
          data-testid="app-nav-drawer-li-sites"
        />
        <v-list-item
          nuxt
          to="/data/potteries"
          router
          title="Pottery"
          data-testid="app-nav-drawer-li-potteries"
        />
        <v-list-item
          nuxt
          to="/data/samples"
          router
          title="Sample"
          data-testid="app-nav-drawer-li-sites"
        />
        <v-list-item
          nuxt
          to="/data/sites"
          router
          title="Site"
          data-testid="app-nav-drawer-li-sites"
        />
        <v-list-item
          nuxt
          to="/data/stratigraphic-units"
          router
          title="Stratigraphic Unit"
          data-testid="app-nav-drawer-li-sites"
        />
      </v-list-group>
      <v-list-group v-if="hasRole(ApiRole.Editor)" value="Jobs">
        <template #activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="fas fa-toolbox"
            title="Jobs"
            data-testid="app-nav-drawer-li-jobs"
          />
        </template>
        <v-list-item
          nuxt
          to="/jobs/imported_files"
          router
          title="Imported files"
          data-testid="app-nav-drawer-li-imported-files"
        />
      </v-list-group>
      <v-list-group v-if="hasRoleAdmin" value="Admin">
        <template #activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="fas fa-screwdriver-wrench"
            title="Admin"
            data-testid="app-nav-drawer-li-admin"
          />
        </template>
        <v-list-item
          nuxt
          to="/admin/users"
          router
          title="Users"
          data-testid="app-nav-drawer-li-users"
        />
      </v-list-group>
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
