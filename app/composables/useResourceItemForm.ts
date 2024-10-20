import type { ApiAction, ApiResourceItem } from '~~/types'

export default function <RT extends ApiResourceItem>(
  mode: ApiAction,
  item: RT,
) {
  const { isAuthenticated } = useAppAuth()
  const readonly = computed(
    () => ['read', 'delete'].includes(mode) || !isAuthenticated.value,
  )
  const state = readonly.value ? item : reactive(clone(item))

  return { isAuthenticated, readonly, state }
}
