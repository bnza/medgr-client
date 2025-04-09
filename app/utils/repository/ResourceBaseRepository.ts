import type {
  ApiResourceItem,
  JsonLdResourceDocument,
  JsonLdResourceItem,
} from '~~/types'
import type { $Fetch } from 'nitropack'
import AbstractRepository from '~/utils/repository/AbstractRepository'

class ResourceBaseRepository<
  ResourceType extends ApiResourceItem,
> extends AbstractRepository {
  constructor(
    readonly baseUrl: string,
    $fetch: $Fetch,
  ) {
    super($fetch)
  }

  getItemUrl(id: string | number) {
    return `${this.baseUrl}/${id}`
  }

  fetchItem(id: string | number) {
    const url = this.getItemUrl(id)
    return this.$fetch<
      JsonLdResourceDocument<JsonLdResourceItem<ResourceType>>
    >(url, {
      method: 'GET',
    })
  }
}

export default ResourceBaseRepository
