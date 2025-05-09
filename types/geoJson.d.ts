import type {
  Feature,
  Point,
  Geometry,
  GeoJsonProperties,
  FeatureCollection,
} from 'geojson'

export type ApiGeoJsonDataFeature<
  K extends ApiGeometryDataResourceKey | GeoJsonProperties = GeoJsonProperties,
  G extends Geometry = Point,
> = Feature<G, K extends ApiDataResourceKey ? ApiDataResource<K> : K>

export type FeatureCollectionFromFeature<T extends Feature<any, any>> =
  T extends Feature<infer G, infer P> ? FeatureCollection<G, P> : never

export type ExtractGeometricKey<K> = K extends `${infer T}Geometry` ? T : never
