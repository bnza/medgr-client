import type {
  ApiDataResourceKey,
  ApiResourceKey,
  StaticResourceConfig,
} from '~~/types/api'
import microStratigraphicUnit from '~/utils/resources/data/microStratigraphicUnit'
import pottery from '~/utils/resources/data/pottery'
import potteriesMediaObject from '~/utils/resources/data/potteriesMediaObject'
import sample from './data/sample'
import site from './data/site'
import sitesUser from './data/sitesUser'
import stratigraphicUnit from './data/stratigraphicUnit'
import stratigraphicUnitsMediaObject from './data/stratigraphicUnitsMediaObject'
import stratigraphicUnitsRelationship from './data/stratigraphicUnitsRelationship'
import user from './data/user'
import vocabularies from './vocabularies'

export const data: Record<ApiDataResourceKey, StaticResourceConfig> = {
  microStratigraphicUnit,
  pottery,
  potteriesMediaObject,
  sample,
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
