<script setup lang="ts">
const center = ref([40, 40])
const projection = ref('EPSG:4326')
const zoom = ref(8)
const rotation = ref(0)
</script>

<template>
  <ol-map
    :load-tiles-while-animating="true"
    :load-tiles-while-interacting="true"
    style="height: 100%; width: 100%"
  >
    <ol-view
      ref="view"
      v-model:center="center"
      v-model:zoom="zoom"
      :rotation="rotation"
      :projection="projection"
    />

    <ol-tile-layer>
      <ol-source-osm />
    </ol-tile-layer>
  </ol-map>
</template>
