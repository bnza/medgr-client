import { ApiRole, ROLE_COLORS } from '~/utils/consts/auth'
import type { ApiResourceSite } from '~~/types'
import type { SessionData } from '#auth'

type ApiResourceSiteItem = Pick<ApiResourceSite, 'id'>
const _hasSitePrivileges = (
  site: ApiResourceSiteItem,
  sessionData: SessionData | null | undefined,
) => (sessionData?.privileges ? site.id in sessionData.privileges : false)

const _getSitePrivilege = (
  site: ApiResourceSiteItem,
  sessionData: SessionData | null | undefined,
) =>
  _hasSitePrivileges(site, sessionData)
    ? sessionData?.privileges[site.id]
    : false

export function useAppAuth() {
  const { data, status } = useAuth()
  const isAuthenticated = computed(() => unref(status) === 'authenticated')
  const isLoading = computed(() => unref(status) === 'loading')
  const userIdentifier = computed(() =>
    unref(isAuthenticated) && data.value && 'email' in data.value
      ? data.value.email
      : null,
  )
  const isCurrentUser = computed(
    () => (email: string) =>
      isAuthenticated.value && userIdentifier.value === email,
  )

  const roles = computed(() =>
    unref(isAuthenticated) ? data.value?.roles || [] : [],
  )

  function _hasRole(role: ApiRole) {
    return unref(isAuthenticated) && unref(roles).includes(role)
  }

  const hasSitePrivileges = computed(
    () => (site: ApiResourceSiteItem) =>
      hasRoleAdmin.value || _hasSitePrivileges(site, data.value),
  )

  const getSitePrivilege = computed(
    () => (site: ApiResourceSite) =>
      hasRoleAdmin.value || _getSitePrivilege(site, data.value),
  )
  const hasRole = computed(() => _hasRole)
  const hasRoleAdmin = computed(() => _hasRole(ApiRole.Admin))
  const roleColor = computed(() => {
    const role = reduceAppRoles(roles.value)
    return isAppRole(role) ? ROLE_COLORS[role] : '#FFF'
  })

  return {
    getSitePrivilege,
    hasRole,
    hasRoleAdmin,
    hasSitePrivileges,
    isAuthenticated,
    isCurrentUser,
    isLoading,
    userIdentifier,
    roleColor,
  }
}
