<script setup lang="ts">
withDefaults(
  defineProps<{
    appPath: string
    disabled?: boolean
  }>(),
  {
    disabled: false,
  },
)
</script>

<template>
  <v-btn
    :disabled
    icon
    nuxt
    :to="`${appPath}/import`"
    variant="text"
    data-testid="collection-import-link"
  >
    <v-icon color="primary" icon="fas fa-upload" />
    <v-tooltip activator="parent" location="bottom">Import file</v-tooltip>
  </v-btn>
</template>
