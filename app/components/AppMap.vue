<script setup lang="ts">
import { Map, Layers, Sources } from 'vue3-openlayers'
const center = ref([40, 40])
const projection = ref('EPSG:4326')
const zoom = ref(8)
const rotation = ref(0)
</script>

<template>
  <Map.OlMap
    :load-tiles-while-animating="true"
    :load-tiles-while-interacting="true"
    style="height: 100%; width: 100%"
  >
    <Map.OlView ref="view" :center :projection :rotation :zoom />
    <Layers.OlTileLayer>
      <Sources.OlSourceOsm />
    </Layers.OlTileLayer>
  </Map.OlMap>
</template>
