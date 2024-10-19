import {
  ApiRole,
  ApiSiteRole,
  type ApiSpecialistRole,
  SITE_ROLES_BITMASK_MAP,
  ROLE_HIERARCHY_VALUES,
  SITES_ROLE_COLORS,
} from '~/utils/consts/auth'
import { isAppRole, isSpecialistRole } from '~/utils/guards'

const getRoleHierarchyValue = (role: ApiRole | ''): number =>
  role ? ROLE_HIERARCHY_VALUES[role] : 0

export const reduceAppRoles = (roles: Array<string>) => {
  const appRoles = roles.filter(isAppRole)
  return appRoles.reduce((acc: ApiRole | '', curr) => {
    return getRoleHierarchyValue(curr) > getRoleHierarchyValue(acc) ? curr : acc
  }, '')
}
const removeAppRoles = (roles: Array<ApiSpecialistRole | ApiRole>) => {
  return roles.filter(isSpecialistRole)
}
const expandAppRole = (role: ApiRole) =>
  Object.values(ApiRole).filter(
    (curRole) => getRoleHierarchyValue(curRole) <= getRoleHierarchyValue(role),
  )
export const mergeRole = (
  role: ApiRole,
  roles: Array<ApiRole | ApiSpecialistRole>,
) => {
  const _roles = removeAppRoles(roles)
  const _expandedRoles = expandAppRole(role)
  return [..._roles, ..._expandedRoles]
}
export const hasSitePrivilege = (
  sitePrivileges: number | false,
  privilegeKey: ApiSiteRole,
) =>
  sitePrivileges !== false &&
  Boolean(sitePrivileges & SITE_ROLES_BITMASK_MAP[privilegeKey])

export const grantSitePrivilege = (
  sitePrivileges: number,
  privilegeKey: ApiSiteRole,
) => sitePrivileges | SITE_ROLES_BITMASK_MAP[privilegeKey]
export const revokeSitePrivilege = (
  sitePrivileges: number,
  privilegeKey: ApiSiteRole,
) => sitePrivileges & ~SITE_ROLES_BITMASK_MAP[privilegeKey]

export const assignSitePrivilege = (
  flag: boolean,
  sitePrivileges: number,
  privilegeKey: ApiSiteRole,
) => {
  const fn = flag ? grantSitePrivilege : revokeSitePrivilege
  return fn(sitePrivileges, privilegeKey)
}

export const toggleSitePrivilege = (
  sitePrivileges: number,
  privilegeKey: ApiSiteRole,
) => {
  const fn = hasSitePrivilege(sitePrivileges, privilegeKey)
    ? revokeSitePrivilege
    : grantSitePrivilege
  return fn(sitePrivileges, privilegeKey)
}

export const getSitePrivilegeKey = (sitePrivilege: number) => {
  let key = ApiSiteRole.User
  for (const role of [ApiSiteRole.Editor]) {
    if (hasSitePrivilege(sitePrivilege, role)) {
      key = role
    }
  }
  return key
}

export const getSitePrivilegeColor = (sitePrivileges: number) => {
  return SITES_ROLE_COLORS[getSitePrivilegeKey(sitePrivileges)]
}
