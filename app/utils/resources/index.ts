import type {
  ApiDataResourceKey,
  ApiResourceKey,
  StaticResourceConfig,
} from '~~/types/api'
import pottery from '~/utils/resources/data/pottery'
import site from './data/site'
import sitesUser from './data/sitesUser'
import stratigraphicUnit from './data/stratigraphicUnit'
import stratigraphicUnitsMediaObject from './data/stratigraphicUnitsMediaObject'
import stratigraphicUnitsRelationship from './data/stratigraphicUnitsRelationship'
import user from './data/user'
import vocabularies from './vocabularies'

export const data: Record<ApiDataResourceKey, StaticResourceConfig> = {
  pottery,
  site,
  sitesUser,
  stratigraphicUnit,
  stratigraphicUnitsMediaObject,
  stratigraphicUnitsRelationship,
  user,
} as const

export const resources = Object.freeze(Object.assign({}, data, vocabularies))

export const apiResourceKeys = [
  ...Object.keys(data),
  ...Object.keys(vocabularies),
] as const as ApiResourceKey[]

export { vocabularies }
