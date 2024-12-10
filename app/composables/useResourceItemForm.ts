import type { ApiAction, ApiResourceItem } from '~~/types'

export default function <RT extends ApiResourceItem>(
  mode: ApiAction,
  item: RT,
  normalizeState = (state: RT) => state,
) {
  const { isAuthenticated } = useAppAuth()
  const readonly = computed(
    () => ['read', 'delete'].includes(mode) || !isAuthenticated.value,
  )
  const _state = normalizeState(clone(item))
  const state = readonly.value ? _state : reactive(_state)

  return { isAuthenticated, readonly, state }
}
