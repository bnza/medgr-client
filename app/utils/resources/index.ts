import type {
  ApiDataResourceKey,
  ApiResourceKey,
  StaticResourceConfig,
} from '~~/types/api'
import site from './data/site'
import stratigraphicUnit from './data/stratigraphicUnit'
import vocabularies from './vocabularies'

export const data: Record<ApiDataResourceKey, StaticResourceConfig> = {
  site,
  stratigraphicUnit,
} as const

export const resources = Object.freeze(Object.assign({}, data, vocabularies))

export const apiResourceKeys = [
  ...Object.keys(data),
  ...Object.keys(vocabularies),
] as const as ApiResourceKey[]

export { vocabularies }
