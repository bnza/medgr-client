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
