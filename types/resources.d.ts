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
  site:
    | (Pick<ApiResourceSite, 'id' | 'code' | 'name'> & { '@id': string })
    | string
  year: number
  number: number
  code: string
  interpretation?: string
  description?: string
  public?: boolean
}
export interface ApiResourceUser extends ApiResourceItem {
  id: string
  email: string
  roles: Array<ApiRole | ApiSpecialistRole>
  privileges: Record<number, number>
}

export interface ApiResourceSitesUser extends ApiResourceItem {
  site:
    | (Pick<ApiResourceSite, 'id' | 'code' | 'name'> & { '@id': string })
    | string
  user: (Pick<ApiResourceUser, 'id' | 'email'> & { '@id': string }) | string
  privileges: number
}
export interface ApiResourceMediaObject extends ApiResourceItem {
  contentUrl: string
  originalFilename: string
  mimeType: string
  size: number
}
export interface ApiResourceMediaObjectJoin extends ApiResourceItem {
  item: ApiResourceItem
  mediaObject: ApiResourceMediaObject
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
  stratigraphicUnit: Pick<ApiResourceStratigraphicUnit, 'id' | 'code' | 'site'>
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
export interface ApiResourceSample extends ApiResourceItem {
  stratigraphicUnit: Pick<ApiResourceStratigraphicUnit, 'id' | 'code' | 'site'>
  number: number
  description?: string
  collector?: string
  takingDate?: string | Date
}

export type StratigraphicUnitRelationshipKey =
  | 'c'
  | 'C'
  | 'e'
  | 'f'
  | 'F'
  | 'x'
  | 'X'
