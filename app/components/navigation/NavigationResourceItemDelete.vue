<script setup lang="ts">
withDefaults(
  defineProps<{
    appPath: string
    disabled?: boolean
    id: string | number
    size?: string
  }>(),
  {
    disabled: false,
    size: 'xsmall',
  },
)
</script>

<template>
  <v-btn
    density="compact"
    :disabled
    icon
    nuxt
    :to="`${appPath}/${id}/delete`"
    variant="text"
    data-testid="delete-item-button"
  >
    <v-icon color="error" icon="fas fa-minus" :size />
    <v-tooltip activator="parent" location="bottom">Delete item</v-tooltip>
  </v-btn>
</template>
