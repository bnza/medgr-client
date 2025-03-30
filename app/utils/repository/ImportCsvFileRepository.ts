import type { $Fetch } from 'nitropack'
import type {
  ApiResourceWorkUnit,
  ImportableDataResourceKey,
  JsonLdResourceItem,
} from '~~/types'
import { camelToSnakeCase } from '~/utils'
import WorkUnitRepository from './WorkUnitRepository'

const plurals: Partial<Record<ImportableDataResourceKey, string>> = {}

const pluralize = (resourceKey: ImportableDataResourceKey) => {
  return plurals[resourceKey] ?? camelToSnakeCase(resourceKey) + 's'
}
class ImportCsvFileRepository extends WorkUnitRepository {
  readonly apiResourceKeyInflection: string
  constructor(
    $fetch: $Fetch,
    readonly resourceKey: ImportableDataResourceKey,
    readonly workUnitApiBasePath: string,
  ) {
    super(workUnitApiBasePath, $fetch)
    this.apiResourceKeyInflection = pluralize(resourceKey)
  }

  get uploadUrl(): string {
    return `${this.workUnitApiBasePath}/import/csv/${this.apiResourceKeyInflection}`
  }

  uploadFile(file: File) {
    const item = new FormData()
    item.append('file', file)
    return this.$fetch<JsonLdResourceItem<ApiResourceWorkUnit>>(
      this.uploadUrl,
      {
        method: 'POST',
        headers: {
          Accept: 'application/ld+json',
        },
        body: item,
      },
    )
  }
}

export default ImportCsvFileRepository
