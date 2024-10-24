<script setup lang="ts">
import type { ResourceCollectionParent } from '~~/types'
import usePageResourceCollectionParent from '~/composables/usePageResourceCollectionParent'

withDefaults(
  defineProps<{
    appPath: string
    disabled?: boolean
    parent?: ResourceCollectionParent
  }>(),
  {
    disabled: false,
    parent: undefined,
  },
)
const { parent: parentState } = usePageResourceCollectionParent()
</script>

<template>
  <v-btn
    :disabled
    icon
    nuxt
    :to="`${appPath}/create`"
    variant="text"
    data-testid="create-item-button"
    @click="parentState = parent"
  >
    <v-icon color="primary" icon="fas fa-plus" />
    <v-tooltip activator="parent" location="bottom">Create item</v-tooltip>
  </v-btn>
</template>

<style scoped></style>
