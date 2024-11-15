<script setup lang="ts">
const ready = ref(false)
const name = computed(() => (ready.value ? 'default' : 'empty'))
const { fetch } = useApiVocabulariesStore()
callOnce(async () => {
  await fetch()
})
Promise.all([fetch()]).then((_) => (ready.value = true))
</script>
<template>
  <v-app theme="dark">
    <v-layout data-testid="app-layout">
      <v-main class="d-flex align-center justify-center">
        <NuxtLayout :name>
          <NuxtLoadingIndicator color="warning" />
          <NuxtPage />
        </NuxtLayout>
        <app-snackbar />
      </v-main>
    </v-layout>
  </v-app>
</template>
