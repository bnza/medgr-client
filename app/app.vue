<script setup lang="ts">
const ready = ref(true);
</script>
<template>
  <v-app theme="dark">
    <v-layout>
      <v-main v-if="!ready" class="d-flex align-center justify-center">
        <home-page-logo />
      </v-main>
      <v-main v-else class="d-flex align-center justify-center">
        <app-bar />
        <app-navigation-drawer />
        <NuxtPage />
      </v-main>
    </v-layout>
  </v-app>
</template>
