<script setup lang="ts">
const ready = ref(true)
const name = computed(() => (ready.value ? 'default' : 'empty'))
</script>
<template>
  <v-app theme="dark">
    <v-layout data-testid="app-layout">
      <v-main class="d-flex align-center justify-center">
        <NuxtLayout :name>
          <NuxtPage />
        </NuxtLayout>
        <app-snackbar />
      </v-main>
    </v-layout>
  </v-app>
</template>
