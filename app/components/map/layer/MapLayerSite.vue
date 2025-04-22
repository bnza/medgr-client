<script setup lang="ts">
import { Sources } from 'vue3-openlayers'
import type VectorSource from 'ol/source/Vector'

const sourceRef = ref<{ source: VectorSource | null } | null>(null)

const baseUrl = useRuntimeConfig().public.apiBaseUrl
const url = computed(() => `${baseUrl}/api/geometry/sites.geojson`)

onMounted(() => {
  const olSource = sourceRef.value?.source
  if (olSource) {
    olSource.on('featuresloaderror', (event) => {
      console.error('Error loading features:', event)
    })
  } else {
    // This might log if the ref binding was the issue
    console.warn('Could not get source reference in onMounted')
  }
})
</script>

<template>
  <map-layer-vector>
    <template #default="{ format }">
      <Sources.OlSourceVector ref="sourceRef" :url :format />
    </template>
  </map-layer-vector>
</template>

<style scoped></style>
