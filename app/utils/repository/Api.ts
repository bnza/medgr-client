import type { FetchOptions } from 'ofetch'
import type { $Fetch } from 'nitropack'
import type {
  ApiResourceItem,
  ApiDataResourceKey,
  ApiResourceKey,
  ImportableDataResourceKey,
} from '~~/types'
import ResourceRepository from './ResourceRepository'
import ValidatorRepository from './ValidatorRepository'
import AutocompleteRepository from './AutocompleteRepository'
import UserRepository from './UserRepository'
import ImportCsvFileRepository from './ImportCsvFileRepository'
import WorkUnitRepository from './WorkUnitRepository'

export default class Api {
  readonly #fetcher: $Fetch
  readonly paths: Readonly<Record<ApiResourceKey, string>>
  #autocomplete: AutocompleteRepository | undefined
  #resources: Map<ApiDataResourceKey, ResourceRepository<ApiResourceItem>>
  #imports: Map<ImportableDataResourceKey, ImportCsvFileRepository>
  #validator: ValidatorRepository | undefined
  #userRepository: UserRepository | undefined
  #workUnitRepository: WorkUnitRepository | undefined

  constructor(
    index: Record<ApiResourceKey, string>,
    private readonly fetchOptions: FetchOptions,
  ) {
    this.paths = Object.freeze(index)
    this.#fetcher = $fetch.create(fetchOptions)
    this.#resources = new Map<
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

  getRepository<RT extends ApiResourceItem>(
    resourceKey: ApiDataResourceKey,
  ): ResourceRepository<RT> {
    if (!this.#resources.has(resourceKey)) {
      this.#resources.set(
        resourceKey,
        new ResourceRepository<RT>(this.paths[resourceKey], this.#fetcher),
      )
    }
    // @ts-expect-error: map value has been set above!
    return this.#resources.get(resourceKey)
  }

  getWorkUnitRepository(): WorkUnitRepository {
    if (!this.#workUnitRepository) {
      this.#workUnitRepository = new WorkUnitRepository(
        this.#fetcher,
        this.paths['workUnit'],
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
