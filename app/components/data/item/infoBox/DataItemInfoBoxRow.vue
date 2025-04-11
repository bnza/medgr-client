<script setup lang="ts">
defineProps<{
  label: string
  text: string
}>()
</script>

<template>
  <v-row dense>
    <v-col cols="3" class="text-secondary text-end text-no-wrap"
      >{{ label }}:</v-col
    >
    <v-col cols="9" class="text-grey">
      <small>{{ text }}</small>
    </v-col>
  </v-row>
</template>
