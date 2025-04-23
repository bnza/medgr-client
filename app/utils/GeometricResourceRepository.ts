import type { ApiGeoJsonDataFeature } from '~~/types/geoJson'
import AbstractRepository from '~/utils/repository/AbstractRepository'
import type { $Fetch } from 'nitropack'

class GeometricResourceRepository<
  RT extends ApiGeoJsonDataFeature,
> extends AbstractRepository {
  constructor(
    readonly baseUrl: string,
    $fetch: $Fetch,
  ) {
    super($fetch)
  }
}

export default GeometricResourceRepository
