<script setup lang="ts">
import type VectorSource from 'ol/source/Vector'
import type { GeoJSON } from 'ol/format'
import type { Extent } from 'ol/extent'
import type Feature from 'ol/Feature'
import type { ProjectionLike } from 'ol/proj'
import type OLGeometry from 'ol/geom/Geometry'
import type {
  ApiGeoJsonDataFeature,
  FeatureCollectionFromFeature,
} from '~~/types/geoJson'
import type { ApiGeometricDataResourceKey } from '~~/types/api'
import { Sources } from 'vue3-openlayers'
import { bbox } from 'ol/loadingstrategy.js'

const props = defineProps<{
  format: GeoJSON
  resourceKey: ApiGeometricDataResourceKey
}>()

const sourceRef = ref<{ source: VectorSource | null } | null>(null)
const getSource = () => sourceRef.value?.source

const { data, status, error, fetchCollection } =
  useResourceFetchGeometryCollection(props.resourceKey)

function addFeatures(
  featureCollection: FeatureCollectionFromFeature<
    ApiGeoJsonDataFeature<typeof props.resourceKey, any>
  >,
) {
  const olSource = sourceRef.value?.source
  if (olSource && featureCollection.features) {
    olSource.clear()
    const olFeatures = props.format.readFeatures(featureCollection)
    olSource.addFeatures(olFeatures)
    return olFeatures
  }
  return []
}

const loader = (
  extent: Extent,
  resolution: number,
  projection: ProjectionLike,
  success?: (features: Array<Feature<OLGeometry>>) => void,
  failure?: () => void,
) => {
  fetchCollection()
    .then(() => {
      if (data.value && data.value.features && success) {
        success(addFeatures(data.value))
      } else if (success) {
        success([])
      }
    })
    .catch((err) => {
      console.error('Error in vector source loader:', err)
      if (failure) {
        failure()
      }
    })
}

defineExpose({
  sourceRef,
  getSource,
  fetchFeatures: loader,
  status,
  error,
})
</script>

<template>
  <Sources.OlSourceVector
    ref="sourceRef"
    :loader="loader"
    :format="format"
    :strategy="bbox"
  />
</template>
