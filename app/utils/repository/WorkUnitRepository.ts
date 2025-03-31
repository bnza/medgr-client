import type { ApiResourceWorkUnit, JsonLdResourceItem } from '~~/types'
import ResourceBaseRepository from '~/utils/repository/ResourceBaseRepository'

class WorkUnitRepository extends ResourceBaseRepository<ApiResourceWorkUnit> {
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

  fetchCachedItem(id: string, cached: boolean = false) {
    let url = this.getItemUrl(id)
    url += cached ? '/cached' : ''
    return this.$fetch<JsonLdResourceItem<ApiResourceWorkUnit>>(url, {
      method: 'GET',
      headers: {
        Accept: 'application/ld+json',
      },
    })
  }
}

export default WorkUnitRepository
