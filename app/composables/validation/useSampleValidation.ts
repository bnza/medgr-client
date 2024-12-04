import type { ApiResourceSample } from '~~/types'
import { useAsyncValidator } from '~/composables/validation/useAsyncValidator'
import { required, validateState, isInteger } from '~/utils/validations'

export default function <RT extends ApiResourceSample>(item: Partial<RT>) {
  const uniqueSample = useAsyncValidator({
    prop: ['stratigraphicUnit.id', 'number'],
    path: 'sample',
    message: 'Duplicate SU - number pair',
    item,
  })
  const rules = {
    stratigraphicUnit: [
      validateState<RT>('stratigraphicUnit', required),
      uniqueSample,
    ],
    number: [
      validateState<RT>('number', required),
      validateState<RT>('number', isInteger),
      validateState<RT>('number', greaterThanOrEqual(1)),
      uniqueSample,
    ],
  }

  return (key: keyof typeof rules) => rules[key]
}
