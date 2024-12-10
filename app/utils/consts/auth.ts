import { COLORS } from '~/utils/consts/colors'
import type { BaseAcl } from '~~/types'

export enum ApiRole {
  Admin = 'ROLE_ADMIN',
  Editor = 'ROLE_EDITOR',
  User = 'ROLE_USER',
}
export enum ApiSiteRole {
  Editor = 'ROLE_SITE_EDITOR',
  User = 'ROLE_SITE_USER',
}
export enum ApiSpecialistRole {
  GeoArchaeologist = 'ROLE_GEO_ARCHAELOGIST',
}
export enum AclVoters {
  HasRoleAdmin = 'HasRoleAdmin',
}
export const ROLE_HIERARCHY_VALUES: Readonly<Record<ApiRole, number>> = {
  [ApiRole.Admin]: 1000,
  [ApiRole.Editor]: 100,
  [ApiRole.User]: 10,
} as const
export const ROLE_COLORS = {
  [ApiRole.Admin]: COLORS.error,
  [ApiRole.Editor]: COLORS.warning,
  [ApiRole.User]: COLORS.success,
} as const
export const SITE_ROLES_BITMASK_MAP: Readonly<Record<ApiSiteRole, number>> = {
  [ApiSiteRole.User]: 0b0,
  [ApiSiteRole.Editor]: 0b1,
} as const
export const SITES_ROLE_COLORS: Readonly<Record<ApiSiteRole, string>> = {
  [ApiSiteRole.User]: COLORS.success,
  [ApiSiteRole.Editor]: COLORS.warning,
} as const
export const defaultBaseAcl: Readonly<BaseAcl> = Object.freeze({
  canRead: true,
  canUpdate: false,
  canDelete: false,
})
