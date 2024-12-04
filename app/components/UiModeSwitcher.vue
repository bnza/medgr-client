<script setup lang="ts">
const { state, icon, toggle } = useAppUiModeStore()
const text = computed(() => (state === 'map' ? 'Map mode' : 'Data mode'))
</script>

<template>
  <v-tooltip :text="text">
    <template #activator="{ props }">
      <v-btn class="mr-6" :icon="icon" v-bind="props" @click="toggle" />
    </template>
  </v-tooltip>
</template>
