<script setup lang="ts">
const model = defineModel<number>()
defineProps<{ readonly: boolean; label: string }>()
</script>

<template>
  <v-label
    style="font-size: 0.8rem; display: block"
    class="mb-2"
    :text="label"
  />
  <v-rating v-model="model" :readonly clearable>
    <template #item="{ isFilled }">
      <v-icon :color="isFilled ? 'primary' : 'grey-lighten-1'">
        {{ isFilled ? 'fas fa-circle' : 'far fa-circle' }}
      </v-icon>
    </template>
  </v-rating>
</template>

<style scoped></style>
