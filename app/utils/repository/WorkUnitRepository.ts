import type { ApiResourceWorkUnit, JsonLdResourceItem } from '~~/types'
import ResourceBaseRepository from '~/utils/repository/ResourceBaseRepository'

class WorkUnitRepository extends ResourceBaseRepository<ApiResourceWorkUnit> {
  // constructor(
  //   $fetch: $Fetch,
  //   readonly workUnitApiBasePath: string,
  // ) {
  //   super($fetch)
  // }
  // getItemUrl(id: string): string {
  //   return `${this.workUnitApiBasePath}/${id}`
  // }

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

  // fetchItemStatus(id: string) {
  //   return this.$fetch<JsonLdResourceItem<ApiResourceWorkUnit>>(
  //     `${this.getItemUrl(id)}/status`,
  //     {
  //       method: 'GET',
  //       headers: {
  //         Accept: 'application/ld+json',
  //       },
  //     },
  //   )
  // }
}

export default WorkUnitRepository
