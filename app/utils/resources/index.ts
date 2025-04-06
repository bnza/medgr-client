import type {
  ApiDataResourceKey,
  ApiResourceKey,
  StaticResourceConfig,
} from '~~/types/api'
import importFile from '~/utils/resources/data/importFile'
import importedFile from '~/utils/resources/data/importedFile'
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
import workUnit from './workUnit'
import vocabularies from './vocabularies'

export const data: Record<ApiDataResourceKey, StaticResourceConfig> = {
  importFile,
  importedFile,
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

export const resources = Object.freeze(
  Object.assign({}, data, vocabularies, { workUnit }),
)

export const apiDataResourceKey = [
  ...Object.keys(data),
] as const as ApiDataResourceKey[]

export const apiResourceKeys = [
  ...Object.keys(resources),
] as const as ApiResourceKey[]

export { vocabularies }
