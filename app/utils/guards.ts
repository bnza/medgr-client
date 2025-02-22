import type {
  JsonLdConstraintViolations,
  JsonLdHydraError,
} from '~~/types/jsonld'
import { ApiRole, type ApiSpecialistRole } from '~/utils/consts/auth'
import type { ApiResourceKey } from '~~/types/api'
import { apiResourceKeys } from '~/utils/resources'
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

export const isApiLdResourceItem = (value: unknown): value is ApiResourceItem =>
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

export const isApiResourceKey = (value: string): value is ApiResourceKey =>
  (apiResourceKeys as ReadonlyArray<string>).includes(value)

export const isFetchResponse = (
  value: unknown,
): value is FetchResponse<unknown> =>
  isLiteralObject(value) &&
  ['status', 'statusText', '_data'].every((key) => key in value)

export const isValidResourceIdRef = (
  value: Ref<unknown>,
): value is Ref<string | number> =>
  ['string', 'number'].includes(typeof value.value)
