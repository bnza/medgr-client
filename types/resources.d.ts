export type ApiId = string | number

export type BaseAcl = {
  canRead: boolean
  canUpdate: boolean
  canDelete: boolean
}

export interface ApiAclResource {
  _acl: BaseAcl
}

export interface ApiResourceItem {
  id: ApiId
}

export interface ApiResourceSite extends ApiResourceItem {
  code: string
  name: string
  description: string
  public?: boolean
}
