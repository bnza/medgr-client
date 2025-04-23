import type { Feature, Point, Geometry, GeoJsonProperties } from 'geojson'

export type ApiGeoJsonDataFeature<
  K extends ApiGeometryDataResourceKey | GeoJsonProperties = GeoJsonProperties,
  G extends Geometry = Point,
> = Feature<G, K extends ApiDataResourceKey ? ApiDataResource<K> : K>
