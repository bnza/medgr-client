import type { FetchOptions } from 'ofetch'
import type { $Fetch } from 'nitropack'
import type {
  ApiResourceItem,
  ApiDataResourceKey,
  ApiResourceKey,
  ImportableDataResourceKey,
  ApiGeometryDataResourceKey,
  ApiDataResource,
} from '~~/types'
import type {
  ApiGeoJsonDataFeature,
  ExtractGeometricKey,
} from '~~/types/geoJson'
import ResourceRepository from './ResourceRepository'
import ValidatorRepository from './ValidatorRepository'
import AutocompleteRepository from './AutocompleteRepository'
import UserRepository from './UserRepository'
import ImportCsvFileRepository from './ImportCsvFileRepository'
import WorkUnitRepository from './WorkUnitRepository'
import GeometryResourceRepository from './GeometryResourceRepository'

export default class Api {
  readonly #fetcher: $Fetch
  #autocomplete: AutocompleteRepository | undefined
  #resourceRepos: Map<ApiDataResourceKey, ResourceRepository<ApiResourceItem>>
  #geoRepos = new Map<
    ApiGeometryDataResourceKey,
    GeometryResourceRepository<ApiGeoJsonDataFeature>
  >()
  #imports: Map<ImportableDataResourceKey, ImportCsvFileRepository>
  #validator: ValidatorRepository | undefined
  #userRepository: UserRepository | undefined
  #workUnitRepository: WorkUnitRepository | undefined

  constructor(
    readonly paths: Record<ApiResourceKey, string>,
    private readonly fetchOptions: FetchOptions,
  ) {
    this.#fetcher = $fetch.create(fetchOptions)
    this.#resourceRepos = new Map<
      ApiDataResourceKey,
      ResourceRepository<ApiResourceItem>
    >()
    this.#imports = new Map<
      ImportableDataResourceKey,
      ImportCsvFileRepository
    >()
  }

  get fetch() {
    return this.#fetcher
  }

  get autocomplete() {
    if (!this.#autocomplete) {
      this.#autocomplete = new AutocompleteRepository(this.#fetcher)
    }
    return this.#autocomplete
  }

  get validator() {
    if (!this.#validator) {
      this.#validator = new ValidatorRepository(this.#fetcher)
    }
    return this.#validator
  }

  get userRepository() {
    if (!this.#userRepository) {
      this.#userRepository = new UserRepository(
        this.paths['user'],
        this.#fetcher,
      )
    }
    return this.#userRepository
  }

  getRepository<K extends ApiDataResourceKey>(
    resourceKey: K,
  ): ResourceRepository<ApiDataResource<K>>

  getRepository<K extends ApiGeometryDataResourceKey>(
    resourceKey: K,
  ): GeometryResourceRepository<ApiGeoJsonDataFeature<ExtractGeometricKey<K>>>

  getRepository(resourceKey: ApiDataResourceKey | ApiGeometryDataResourceKey) {
    if (isApiGeometryDataResourceKey(resourceKey)) {
      return this.getGeoRepository(resourceKey)
    }
    return this.getStandardRepository(resourceKey)
  }

  private getStandardRepository<K extends ApiDataResourceKey>(
    key: ApiDataResourceKey,
  ) {
    if (!this.#resourceRepos.has(key)) {
      this.#resourceRepos.set(
        key,
        new ResourceRepository<ApiDataResource<K>>(
          this.paths[key],
          this.#fetcher,
        ),
      )
    }
    return this.#resourceRepos.get(key)
  }

  private getGeoRepository<RT extends ApiGeoJsonDataFeature>(
    key: ApiGeometryDataResourceKey,
  ): GeometryResourceRepository<RT> {
    if (!this.#geoRepos.has(key)) {
      this.#geoRepos.set(
        key,
        new GeometryResourceRepository<RT>(this.paths[key], this.#fetcher),
      )
    }
    return this.#geoRepos.get(key) as GeometryResourceRepository<RT>
  }

  getWorkUnitRepository(): WorkUnitRepository {
    if (!this.#workUnitRepository) {
      this.#workUnitRepository = new WorkUnitRepository(
        this.paths['workUnit'],
        this.#fetcher,
      )
    }
    return this.#workUnitRepository
  }

  getImportRepository(resourceKey: ImportableDataResourceKey) {
    if (!this.#imports.has(resourceKey)) {
      this.#imports.set(
        resourceKey,
        new ImportCsvFileRepository(
          this.#fetcher,
          resourceKey,
          this.paths['workUnit'],
        ),
      )
    }
    return this.#imports.get(resourceKey)!
  }
}
