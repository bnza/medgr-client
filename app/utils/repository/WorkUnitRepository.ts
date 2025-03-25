import AbstractRepository from './AbstractRepository'
import type { $Fetch } from 'nitropack'
import type { ApiResourceWorkUnit, JsonLdResourceItem } from '~~/types'

class WorkUnitRepository extends AbstractRepository {
  constructor(
    $fetch: $Fetch,
    readonly workUnitApiBasePath: string,
  ) {
    super($fetch)
  }
  getItemUrl(id: string): string {
    return `${this.workUnitApiBasePath}/${id}`
  }

  runJob(id: string) {
    return this.$fetch<JsonLdResourceItem<ApiResourceWorkUnit>>(
      `${this.getItemUrl(id)}/run`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/ld+json',
        },
        body: {},
      },
    )
  }

  fetchItem(id: string, cached: boolean = false) {
    let url = this.getItemUrl(id)
    url += cached ? '/cached' : ''
    console.log(url)
    return this.$fetch<JsonLdResourceItem<ApiResourceWorkUnit>>(url, {
      method: 'GET',
      headers: {
        Accept: 'application/ld+json',
      },
    })
  }

  fetchItemStatus(id: string) {
    return this.$fetch<JsonLdResourceItem<ApiResourceWorkUnit>>(
      `${this.getItemUrl(id)}/status`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/ld+json',
        },
      },
    )
  }
}

export default WorkUnitRepository
