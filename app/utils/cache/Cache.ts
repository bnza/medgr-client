import type {
  ApiResourceKey,
  ResourceCollectionCacheKey,
  ResourceConfig,
} from '~~/types/api'
import type { UseResourceCollection } from '~/composables/useResourceCollection'

export default class Cache {
  public readonly resourceConfigs = new Map<ApiResourceKey, ResourceConfig>()
  public readonly resourceCollections = new Map<
    ResourceCollectionCacheKey,
    UseResourceCollection
  >()
}
