import type { FetchOptions } from 'ofetch'
import type { $Fetch } from 'nitropack'
import type {
  ApiResourceItem,
  ApiDataResourceKey,
  ApiResourceKey,
} from '~~/types'
import ResourceRepository from '~/utils/repository/ResourceRepository'
// import AutocompleteRepository from './AutocompleteRepository'
// import ResourceRepository from './ResourceRepository'
// import ValidatorRepository from './ValidatorRepository'
// import UserRepository from './UserRepository'

export default class Api {
  readonly #fetcher: $Fetch
  readonly paths: Readonly<Record<ApiResourceKey, string>>
  // #autocomplete: AutocompleteRepository
  #resources: Map<ApiDataResourceKey, ResourceRepository<ApiResourceItem>>
  // #validator: ValidatorRepository
  // #userRepository: UserRepository

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
  }

  get fetch() {
    return this.#fetcher
  }
  // getResourceConfig(key: ResourceKey) {
  //   return this.#configs[key]
  // }

  // get autocomplete() {
  //   if (!this.#autocomplete) {
  //     this.#autocomplete = new AutocompleteRepository(this.#fetcher)
  //   }
  //   return this.#autocomplete
  // }
  //
  // get validator() {
  //   if (!this.#validator) {
  //     this.#validator = new ValidatorRepository(this.#fetcher)
  //   }
  //   return this.#validator
  // }
  //
  // get userRepository() {
  //   if (!this.#userRepository) {
  //     this.#userRepository = new UserRepository(
  //       this.paths['user'],
  //       this.#fetcher,
  //     )
  //   }
  //   return this.#userRepository
  // }

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
}
