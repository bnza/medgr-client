<script setup lang="ts">
import { Map, Layers, Sources } from 'vue3-openlayers'
const center = ref([-28000, 4660000])
const projection = ref('EPSG:3857')
const zoom = ref(6)
const rotation = ref(0)
</script>

<template>
  <Map.OlMap
    :load-tiles-while-animating="true"
    :load-tiles-while-interacting="true"
    style="height: 100%; width: 100%"
  >
    <Map.OlView ref="view" :center :projection :rotation :zoom :min-zoom="6" />
    <Layers.OlTileLayer>
      <Sources.OlSourceOsm />
    </Layers.OlTileLayer>
    <map-layer-site />
  </Map.OlMap>
</template>
