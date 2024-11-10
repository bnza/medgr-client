import type { ApiResourceStratigraphicUnitsRelationship } from '~~/types'
import { useAsyncValidator } from '~/composables/validation/useAsyncValidator'
import { required, validateState } from '~/utils/validations'

export default function <RT extends ApiResourceStratigraphicUnitsRelationship>(
  item: Partial<RT>,
) {
  const uniqueRelationship = useAsyncValidator({
    prop: ['sxSU.id', 'dxSU.id'],
    path: 'stratigraphic_units_relationships',
    message: 'Duplicate SU pair',
    item,
  })
  const notSameSU = (state: RT) =>
    state.sxSU.id !== state.dxSU.id || 'Self referencing relationship'
  const rules = {
    sxSU: [validateState<RT>('sxSU', required), uniqueRelationship],
    relationship: [required],
    dxSU: [validateState<RT>('dxSU', required), uniqueRelationship, notSameSU],
  }

  return (key: keyof typeof rules) => rules[key]
}
