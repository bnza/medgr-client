import type {
  JsonLdConstraintViolations,
  JsonLdHydraError,
  JsonLdResourceItem,
} from '~~/types/jsonld'
import { ApiRole, type ApiSpecialistRole } from '~/utils/consts/auth'
import type {
  ApiDataResourceKey,
  ApiGeometryDataResourceKey,
  ApiResourceKey,
  ResourceCollectionParent,
} from '~~/types/api'
import { apiDataResourceKey, apiResourceKeys } from '~/utils/resources'
import type { FetchResponse } from 'ofetch'
import type {
  ApiResourceItem,
  ApiResourceMediaObject,
  ApiResourceMediaObjectJoin,
} from '~~/types'

export const isDefined = <T>(value: T | undefined | null): value is T =>
  value !== undefined && value !== null

export const isLiteralObject = (
  value: unknown,
): value is Record<string | number | symbol, unknown> =>
  typeof value === 'object' && !Array.isArray(value) && value !== null

export const isApiResourceItem = (value: unknown): value is ApiResourceItem =>
  isLiteralObject(value) && 'id' in value

export const isApiResourceItemOrIri = (
  value: unknown,
): value is ApiResourceItem | string =>
  typeof value === 'string' || isApiResourceItem(value)

export const isApiLdResourceItem = (
  value: unknown,
): value is JsonLdResourceItem<ApiResourceItem> =>
  isLiteralObject(value) && '@id' in value
export const isJsonLdValidationResponseError = (
  value: unknown,
): value is JsonLdConstraintViolations =>
  isLiteralObject(value) && value['@type'] === 'ConstraintViolation'

export const isJsonLdResponseHydraError = (
  value: unknown,
): value is JsonLdHydraError =>
  isLiteralObject(value) && value['@type'] === 'hydra:Error'
export const isAppRole = (value: string): value is ApiRole =>
  Object.values<string>(ApiRole).includes(value)

export const isApiLdResourceMediaObjectItem = (
  value: unknown,
): value is ApiResourceMediaObject =>
  isApiResourceItem(value) && 'contentUrl' in value

export const isJsonLdResourceMediaObjectJoinItem = (
  value: unknown,
): value is ApiResourceMediaObjectJoin =>
  isApiResourceItem(value) &&
  'item' in value &&
  isApiResourceItemOrIri(value.item) &&
  'mediaObject' in value &&
  isApiLdResourceMediaObjectItem(value.mediaObject)

export const isSpecialistRole = (value: string): value is ApiSpecialistRole =>
  !isAppRole(value)

export const isApiResourceKey = (value: any): value is ApiResourceKey =>
  typeof value === 'string' &&
  (apiResourceKeys as ReadonlyArray<string>).includes(value)
export const isApiDataResourceKey = (value: any): value is ApiDataResourceKey =>
  typeof value === 'string' &&
  (apiDataResourceKey as ReadonlyArray<string>).includes(value)

export const isApiGeometryDataResourceKey = (
  value: any,
): value is ApiGeometryDataResourceKey =>
  typeof value === 'string' &&
  value.endsWith('Geometry') &&
  isApiDataResourceKey(value.slice(0, -8))
export const isResourceCollectionParent = (
  value: unknown,
): value is ResourceCollectionParent =>
  Array.isArray(value) &&
  'string' === typeof value[0] &&
  isApiDataResourceKey(value[0]) &&
  isLiteralObject(value[1]) &&
  isApiResourceItem(value[1])

export const isFetchResponse = (
  value: unknown,
): value is FetchResponse<unknown> =>
  isLiteralObject(value) &&
  ['status', 'statusText', '_data'].every((key) => key in value)

export const isValidResourceIdRef = (
  value: Ref<unknown>,
): value is Ref<string | number> =>
  ['string', 'number'].includes(typeof value.value)
