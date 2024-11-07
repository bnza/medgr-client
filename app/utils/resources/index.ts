import type {
  ApiDataResourceKey,
  ApiResourceKey,
  StaticResourceConfig,
} from '~~/types/api'
import site from './data/site'
import sitesUser from './data/sitesUser'
import stratigraphicUnit from './data/stratigraphicUnit'
import user from './data/user'
import vocabularies from './vocabularies'

export const data: Record<ApiDataResourceKey, StaticResourceConfig> = {
  site,
  sitesUser,
  stratigraphicUnit,
  user,
} as const

export const resources = Object.freeze(Object.assign({}, data, vocabularies))

export const apiResourceKeys = [
  ...Object.keys(data),
  ...Object.keys(vocabularies),
] as const as ApiResourceKey[]

export { vocabularies }
