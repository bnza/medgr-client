import type {
  JsonLdConstraintViolationsList,
  JsonLdHydraError,
} from '~~/types/jsonld'
import { ApiRole, type ApiSpecialistRole } from '~/utils/consts/auth'

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
