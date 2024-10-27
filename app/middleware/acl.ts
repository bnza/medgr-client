import { AclVoters } from '~/utils'

type VoteResult = { granted: boolean; message?: string; redirectTo?: string }
export default defineNuxtRouteMiddleware((to) => {
  const { hasRoleAdmin } = useAppAuth()
  // @ts-expect-error cannot set custom props in page meta
  const voters: AclVoters[] = to.meta.voters || []
  const { showError } = useAppSnackbarStore()

  const hasRoleAdminVoter = (): VoteResult => {
    const voteResult: VoteResult = { granted: hasRoleAdmin.value }
    if (!voteResult.granted) {
      voteResult.message = 'Insufficient privileges: role ADMIN required'
      voteResult.redirectTo = '/'
    }
    return voteResult
  }

  const allVoters: Record<AclVoters, () => VoteResult> = {
    [AclVoters.HasRoleAdmin]: hasRoleAdminVoter,
  } as const

  const vote = voters.reduce(
    (acc, voter) => (acc.granted ? allVoters[voter]() : acc),
    { granted: true } as VoteResult,
  )

  if (!vote.granted) {
    showError(vote.message || 'Navigation forbidden')
    if (vote.redirectTo) {
      return navigateTo(vote.redirectTo)
    }
    return abortNavigation(vote.message)
  }
})
