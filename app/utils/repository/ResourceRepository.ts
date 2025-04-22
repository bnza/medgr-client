import type {
  ApiResourceItem,
  JsonLdResourceCollection,
  JsonLdResourceItem,
} from '~~/types'
import ResourceBaseRepository from '~/utils/repository/ResourceBaseRepository'
class ResourceRepository<
  ResourceType extends ApiResourceItem,
> extends ResourceBaseRepository<ResourceType> {
  async exportCollection(query: Record<string, unknown>) {
    return this.$fetch<string>(this.baseUrl.replace(/(\/\w+)$/, '/export$1'), {
      method: 'GET',
      headers: {
        Accept: 'text/csv',
        'Content-Type': 'text/csv',
      },
      query,
    })
  }

  async fetchResourceTotalItems() {
    return this.$fetch<JsonLdResourceCollection<ApiResourceItem>>(
      this.baseUrl,
      {
        method: 'GET',
        query: {
          totalItems: 0,
        },
      },
    )
  }

  async patchItem(
    id: string | number,
    diffItem: Record<string, any>,
  ): Promise<never> {
    return this.$fetch(this.getItemUrl(id), {
      method: 'PATCH',
      headers: {
        Accept: 'application/ld+json',
        'Content-Type': 'application/merge-patch+json',
      },
      body: diffItem,
    })
  }

  async postItem(
    item: Record<string, unknown> | FormData,
    contentType = 'application/ld+json',
  ) {
    const headers: Record<string, string> = {
      Accept: 'application/ld+json',
    }
    // For multipart/form-data requests Content-Type header value MUST be undefined
    // in order to avoid boundary problems
    // @see https://stackoverflow.com/questions/39280438/fetch-missing-boundary-in-multipart-form-data-post
    if (contentType !== 'multipart/form-data') {
      headers['Content-Type'] = contentType
    }
    return this.$fetch<JsonLdResourceItem<ResourceType>>(this.baseUrl, {
      method: 'POST',
      headers,
      body: item,
    })
  }

  async deleteItem(item: ApiResourceItem) {
    return this.$fetch<void>(this.getItemUrl(item.id), {
      method: 'DELETE',
      headers: {
        Accept: 'application/ld+json',
        'Content-Type': 'application/ld+json',
      },
    })
  }
}

export default ResourceRepository
