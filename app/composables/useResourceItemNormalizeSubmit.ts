import { diff } from 'deep-object-diff'
import type { ApiAction, ApiResourceItem } from '~~/types'

type NormalizePatch = typeof _normalizePatch
const _normalizePost = <RT extends ApiResourceItem>(item: Partial<RT>) =>
  clone<Partial<RT>>(item)
const _normalizePatch = (
  newItem: Partial<ApiResourceItem>,
  oldItem: ApiResourceItem,
  diffItem: Partial<ApiResourceItem>,
) => diffItem
export default function useResourceItemNormalizeSubmit<
  ResourceType extends ApiResourceItem,
>(
  mode: ApiAction,
  item: ApiResourceItem,
  state: Partial<ResourceType>,
  normalizePost: (
    item: Partial<ResourceType>,
  ) => Record<string, unknown> = _normalizePost,
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
