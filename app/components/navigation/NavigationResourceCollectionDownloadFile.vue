<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    href: string
    size?: string
  }>(),
  {
    size: 'small',
  },
)
</script>

<template>
  <v-btn
    icon
    data-testid="download-file-button"
    color="primary"
    density="compact"
    variant="text"
  >
    <a download :href target="_blank">
      <v-icon class="mx-3" v-bind="props" icon="fas fa-download" :size />
      <v-tooltip activator="parent" location="bottom">Download file</v-tooltip>
    </a>
  </v-btn>
</template>
