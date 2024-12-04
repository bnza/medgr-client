import type { VDataTable } from 'vuetify/lib/components/VDataTable'
import type { ApiId, ApiResourceItem } from '~~/types/resources'
import type { JsonLdResourceItem } from '~~/types/jsonld'

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

export type ReadonlyHeaders = VDataTable['$props']['headers']
export type ApiDataResourceKey =
  | 'pottery'
  | 'sample'
  | 'site'
  | 'sitesUser'
  | 'stratigraphicUnit'
  | 'stratigraphicUnitsMediaObject'
  | 'stratigraphicUnitsRelationship'
  | 'user'

export type ApiVocabularyResourceKey =
  | 'vocabularyPotteryFunctionalGroup'
  | 'vocabularyPotteryPart'
  | 'vocabularyPotteryTypology'
  | 'vocabularySuRelationship'

export type ApiResourceKey = ApiDataResourceKey | ApiVocabularyResourceKey
// export type ApiResourceCollectionParent = [ApiDataResourceType, ApiId]
export type ResourceConfig = Readonly<{
  apiPath: string
  appPath: string
  name: ApiResourceKey
  labels: [string, string]
  protectedFields: Array<string>
  defaultHeaders: ReadonlyHeaders
}>

export type StaticResourceConfig = Optional<
  Omit<ResourceConfig, 'apiPath' | 'name'>,
  'protectedFields'
>

export type VocabularyStaticResourceConfig = Optional<
  StaticResourceConfig,
  'appPath' | 'labels' | 'defaultHeaders'
>

export type ResourceCollectionChildCacheKey =
  `${ApiDataResourceKey}/${ApiDataResourceKey}`

export type ResourceCollectionCacheKey =
  | ApiDataResourceKey
  | ResourceCollectionChilCachedKey

export type ResourceCollectionKey =
  `${ResourceCollectionChildCacheKey}/${ApiId}`

export type ResourceCollectionParent<
  RT extends ApiResourceItem = ApiResourceItem,
> = [ApiDataResourceKey, JsonLdResourceItem<RT>]

export type ApiAction = 'create' | 'update' | 'read' | 'delete'

export type ApiResourceCollectionParent = [
  ApiDataResourceKey | string,
  ApiResourceItem,
]
