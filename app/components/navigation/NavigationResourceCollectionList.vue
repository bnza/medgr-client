<script setup lang="ts">
withDefaults(
  defineProps<{
    path: string
    replace?: boolean
    tooltipText?: string
  }>(),
  {
    replace: false,
    tooltipText: 'Back',
  },
)
</script>

<template>
  <v-tooltip location="bottom" :text="tooltipText">
    <template #activator="{ props }">
      <NuxtLink :to="path" :replace>
        <v-icon class="mx-3" v-bind="props" icon="fas fa-arrow-left" />
      </NuxtLink>
    </template>
  </v-tooltip>
</template>
