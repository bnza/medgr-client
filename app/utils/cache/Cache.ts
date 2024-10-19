import type { ResourceConfig } from '~~/types/api'

export default class Cache {
  public readonly resourceConfigs = new Map<string, ResourceConfig>()
}
