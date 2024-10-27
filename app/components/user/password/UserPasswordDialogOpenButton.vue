<script setup lang="ts">
const props = defineProps<{ mode: 'reset' | 'change' }>()
const { isPasswordDialogOpen, submitStatus } = injectUserPassword()

const text = computed(() =>
  props.mode === 'change' ? 'Change password' : 'Reset password',
)
</script>

<template>
  <v-btn
    :disabled="submitStatus === 'pending'"
    color="warning"
    rounded="false"
    variant="text"
    icon
    data-testid="change-pw-button"
    @click="isPasswordDialogOpen = true"
  >
    <v-icon icon="fas fa-key" />
    <v-tooltip activator="parent" location="bottom">{{ text }}</v-tooltip>
  </v-btn>
</template>
