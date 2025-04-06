import type {
  ApiAclResource,
  ApiResourceItem,
  ApiResourceStratigraphicUnit,
  ApiResourceStratigraphicUnitsRelationship,
  StratigraphicUnitRelationshipKey,
} from '~~/types'
import type { AsyncDataRequestStatus } from '#app'

export const stratigraphicUnitsRelationshipInjectionKey =
  Symbol() as InjectionKey<ReturnType<typeof useStratigraphicUnitsRelationship>>

export function injectStratigraphicUnitsRelationship() {
  const injected = inject(stratigraphicUnitsRelationshipInjectionKey)
  if ('undefined' === typeof injected) {
    throw new Error('Invalid injection request')
  }
  return injected
}
const useStratigraphicUnitsRelationship = (
  su: ApiResourceStratigraphicUnit & ApiAclResource,
) => {
  const sxSU = toRef(su)
  if (!isApiResourceItem(su)) {
    throw new Error('Unsupported IRI resource. Use plain object instead.')
  }
  const { fetchCollection, items, refresh } =
    useResourceFetchCollection<ApiResourceStratigraphicUnitsRelationship>(
      'stratigraphicUnitsRelationship',
      ['sxSU', su],
    )

  const isReadonly = ref(true)
  const canUpdate = computed(() => sxSU.value._acl.canUpdate)
  const isEditable = computed(() => !isReadonly.value && canUpdate.value)
  const deletingRelation = ref<ApiResourceItem | undefined>(undefined)

  const creatingRelationshipType = ref<
    StratigraphicUnitRelationshipKey | undefined
  >(undefined)

  const { showSuccess } = useAppSnackbarStore()
  const submitStatus = ref<AsyncDataRequestStatus>('idle')
  const repository = useNuxtApp().$api.getRepository(
    'stratigraphicUnitsRelationship',
  )

  const deleteRelationship = async () => {
    if (deletingRelation.value) {
      try {
        submitStatus.value = 'pending'
        await repository.deleteItem(deletingRelation.value)
        showSuccess('Successfully deleted item')
        deletingRelation.value = undefined
        submitStatus.value = 'success'
      } catch (e) {
        submitStatus.value = 'error'
        console.log(e)
      }
    }
  }

  const config = useRuntimeConfig()
  const creatingRelationshipTypeIri = computed(() =>
    creatingRelationshipType.value
      ? `${config.public.apiBaseUrl}/api/vocabulary/stratigraphic_unit/vocabulary_su_relationships/${creatingRelationshipType.value}`
      : undefined,
  )

  const createRelationship = async (dxSU: string) => {
    if (creatingRelationshipType.value) {
      try {
        await repository.postItem({
          sxSU: sxSU.value['@id'],
          relationship: creatingRelationshipTypeIri.value,
          dxSU,
        })
        showSuccess('Successfully created item')
        submitStatus.value = 'success'
        creatingRelationshipType.value = undefined
      } catch (e) {
        console.log(e)
        submitStatus.value = 'error'
      }
    }
  }
  return {
    createRelationship,
    creatingRelationshipType,
    deletingRelation,
    deleteRelationship,
    fetchCollection,
    isEditable,
    isReadonly,
    items,
    refresh,
    submitStatus,
    sxSU,
  }
}

export default useStratigraphicUnitsRelationship
