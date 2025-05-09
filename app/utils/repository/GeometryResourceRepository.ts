import type {
  ApiGeoJsonDataFeature,
  FeatureCollectionFromFeature,
} from '~~/types/geoJson'
import type { $Fetch } from 'nitropack'
import AbstractRepository from './AbstractRepository'

class GeometryResourceRepository<
  RT extends ApiGeoJsonDataFeature,
> extends AbstractRepository {
  constructor(
    readonly baseUrl: string,
    $fetch: $Fetch,
  ) {
    super($fetch)
  }

  fetchCollection(query: Record<string, unknown> = {}) {
    return this.$fetch<FeatureCollectionFromFeature<RT>>(this.baseUrl, {
      method: 'GET',
      query,
      headers: {
        Accept: 'application/geo+json',
      },
    })
  }
}

export default GeometryResourceRepository
