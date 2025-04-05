import type { JsonLdItem } from '~~/types/jsonld'

export type ApiId = string | number

export type BaseAcl = {
  canRead: boolean
  canUpdate: boolean
  canDelete: boolean
}

export interface ApiAclResource {
  _acl: BaseAcl
}

export interface ApiResourceItem extends Record<string, unknown> {
  id: ApiId
}

export interface ApiResourceSite extends ApiResourceItem {
  id: number
  code: string
  name: string
  description: string
  public?: boolean
}
export interface ApiResourceStratigraphicUnit extends ApiResourceItem {
  id: number
  site: Pick<ApiResourceSite, 'id' | 'code' | 'name'> & { '@id': string }
  year: number
  number: number
  code: string
  interpretation?: string
  description?: string
  public?: boolean
}

export interface ApiSubmitResourceStratigraphicUnit
  extends Omit<ApiResourceStratigraphicUnit, 'site'> {
  site: string
}
export interface ApiResourceUser extends ApiResourceItem {
  id: string
  email: string
  roles: Array<ApiRole | ApiSpecialistRole>
  privileges: Record<number, number>
}

export interface ApiResourceSitesUser extends ApiResourceItem {
  site: Pick<ApiResourceSite, 'id' | 'code' | 'name'> & { '@id': string }
  user: Pick<ApiResourceUser, 'id' | 'email'> & { '@id': string }
  privileges: number
}

export interface ApiSubmitResourceSitesUser
  extends Omit<ApiResourceSitesUser, 'site' | 'user'> {
  site?: string
  user?: string
}

export interface ApiResourceMediaObject extends ApiResourceItem {
  contentUrl: string
  originalFilename: string
  mimeType: string
  size: number
  description: ?string
}

export type ApiResourceImportFile = ApiResourceMediaObject

export interface ApiResourceMediaObjectJoin extends ApiResourceItem {
  item: ApiResourceItem
  mediaObject: ApiResourceMediaObject
  description?: string
}
export interface ApiResourceStratigraphicUnitsRelationship
  extends ApiResourceItem {
  sxSU: Pick<ApiResourceStratigraphicUnit, 'id' | 'code'> & { '@id': string }
  relationship: string
  dxSU: Pick<ApiResourceStratigraphicUnit, 'id' | 'code'> & { '@id': string }
}

export interface ApiVocabularyItem extends ApiResourceItem {
  value: string
  description?: string
}

export interface ApiResourcePottery extends ApiResourceItem {
  stratigraphicUnit: Pick<
    ApiResourceStratigraphicUnit,
    'id' | 'code' | 'site'
  > & { '@id': string }
  number: number
  code: string
  fragmentsNumber: number
  typology: string
  part?: string
  functionalGroup: string
  interpretation?: string
  description?: string
  chronologyLower?: number
  chronologyUpper?: number
  public?: boolean
}

export interface ApiSubmitResourcePottery
  extends Omit<ApiResourcePottery, 'stratigraphicUnit'> {
  stratigraphicUnit: string
}

export interface ApiResourceSample extends ApiResourceItem {
  stratigraphicUnit: Pick<
    ApiResourceStratigraphicUnit,
    'id' | 'code' | 'year' | 'site'
  > & { '@id': string }
  number: number
  description?: string
  collector?: string
  takingDate?: string | Date
}

export interface ApiSubmitResourceSample
  extends Omit<ApiResourceSite, 'stratigraphicUnit'> {
  stratigraphicUnit: string
}

export interface ApiResourceMicroStratigraphicUnit extends ApiResourceItem {
  sample: Pick<ApiResourceStratigraphicUnit, 'id' | 'number'> & {
    '@id': string
  }
  stratigraphicUnit: Pick<
    ApiResourceStratigraphicUnit,
    'id' | 'code' | 'site'
  > & { '@id': string }
  number?: number
  depositType: string
  keyAttributes?: string
  inclusionsGeology: number
  inclusionsBuildingMaterials: number
  inclusionsDomesticRefuse: number
  inclusionsOrganicRefuse: number
  colourPpl: string
  colourXpl: string
  colourOil: string
  lenticularPlateyPeds: boolean
  crumbsOrGranules: boolean
  saBlockyPeds: boolean
  cracks: boolean
  infillings: boolean
  mesofaunaRootBioturbation: number
  earthwormInternalChamber: number
  organicOrganoMineral: number
  earthwormGranule: number
  interpretation?: string
}

export interface ApiSubmitResourceMicroStratigraphicUnit
  extends Omit<
    ApiResourceMicroStratigraphicUnit,
    'sample' | 'stratigraphicUnit'
  > {
  sample: string
  stratigraphicUnit: string
}

export type StratigraphicUnitRelationshipKey =
  | 'c'
  | 'C'
  | 'e'
  | 'f'
  | 'F'
  | 'x'
  | 'X'

export interface ApiWorkUnitStatus extends JsonLdItem {
  value: number
}

export interface ApiResourceWorkUnit extends ApiResourceItem {
  id: string
  name: string
  class: string
  service: string
  description: string
  stepsCount: number
  currentStepNumber: number
  status: ApiWorkUnitStatus
  startedAt: number
  terminatedAt: number
  children: ApiResourceWorkUnit[]
  errors: ApiResourceWorkUnitError[]
}

export interface ApiResourceWorkUnitError extends ApiResourceItem {
  id: string
  workUnit: ApiResourceWorkUnit
  class: string
  message: string
  values: unknown[]
}

export interface ApiResourceImportedFile extends ApiResourceItem {
  id: string
  service: string
  userId: string
  uploadDate: string
  mediaObject: ApiResourceMediaObject
}
