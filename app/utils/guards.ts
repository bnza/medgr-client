import type {
  JsonLdConstraintViolationsList,
  JsonLdHydraError,
} from '~~/types/jsonld'
import { ApiRole, type ApiSpecialistRole } from '~/utils/consts/auth'
import type { ApiResourceKey } from '~~/types/api'
import { apiResourceKeys } from '~/utils/resources'
import type { FetchResponse } from 'ofetch'

export const isLiteralObject = (
  value: unknown,
): value is Record<string | number | symbol, unknown> =>
  typeof value === 'object' && !Array.isArray(value) && value !== null
export const isJsonLdValidationResponseError = (
  value: unknown,
): value is JsonLdConstraintViolationsList =>
  isLiteralObject(value) && value['@type'] === 'ConstraintViolationList'

export const isJsonLdResponseHydraError = (
  value: unknown,
): value is JsonLdHydraError =>
  isLiteralObject(value) && value['@type'] === 'hydra:Error'
export const isAppRole = (value: string): value is ApiRole =>
  Object.values<string>(ApiRole).includes(value)

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
