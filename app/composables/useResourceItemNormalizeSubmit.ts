import { diff } from 'deep-object-diff'
import type { ApiAction, ApiResourceItem } from '~~/types'

type NormalizePost = typeof _normalizePost
type NormalizePatch = typeof _normalizePatch
const _normalizePost = (item: Partial<ApiResourceItem>) => clone(item)
const _normalizePatch = (
  newItem: Partial<ApiResourceItem>,
  oldItem: ApiResourceItem,
  diffItem: Partial<ApiResourceItem>,
) => diffItem
export default function useResourceItemNormalizeSubmit(
  mode: ApiAction,
  item: ApiResourceItem,
  state: ApiResourceItem,
  normalizePost: NormalizePost = _normalizePost,
  normalizePatch: NormalizePatch = _normalizePatch,
) {
  const resourceItemSubmit = inject(resourceItemSubmitInjectionKey)

  if ('undefined' === typeof resourceItemSubmit) {
    throw new Error('No "resourceItemSubmit" provided')
  }
  const { triggerSubmit, submittingItem, submitStatus } = resourceItemSubmit

  watch(triggerSubmit, (flag) => {
    if (flag) {
      triggerSubmit.value = false
      const _state = normalizePost(state)
      if (mode === 'update') {
        submittingItem.value = normalizePatch(_state, item, diff(item, _state))
        return
      }
      submittingItem.value = _state
    }
  })

  return { triggerSubmit, submittingItem, submitStatus }
}
