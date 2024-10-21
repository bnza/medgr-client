<script setup lang="ts">
const model = defineModel<boolean>({ required: true })
</script>

<template>
  <v-btn
    class="mr-4"
    :icon="true"
    data-testid="add-filter-button"
    @click="model = true"
  >
    <v-icon icon="fas fa-plus" />
    <v-tooltip activator="parent" location="bottom">Add filter</v-tooltip>
  </v-btn>
</template>
