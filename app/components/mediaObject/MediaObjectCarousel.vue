<script setup lang="ts">
import type { ApiResourceMediaObjectJoin } from '~~/types'
import { VCarousel } from 'vuetify/lib/components/VCarousel'

defineProps<{
  apiBaseUrl: string
  items: Array<ApiResourceMediaObjectJoin>
}>()
const model = defineModel<number>()
defineEmits<{ close: [] }>()

const carousel = useTemplateRef<VCarousel>('carousel')
onMounted(() => {
  if (carousel.value) {
    carousel.value.$el.focus()
  }
})
</script>

<template>
  <v-carousel
    ref="carousel"
    v-model="model"
    hide-delimiters
    height="600px"
    @keyup.esc="$emit('close')"
  >
    <v-fab
      class="pr-8"
      app
      icon="fas fa-xmark"
      location="top right"
      @click="$emit('close')"
    />
    <media-object-carousel-item
      v-for="item in items"
      :key="item.id"
      :item
      :api-base-url
    />
  </v-carousel>
</template>

<style scoped></style>
