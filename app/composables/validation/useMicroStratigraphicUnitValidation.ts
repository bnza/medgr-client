import type { ApiResourceMicroStratigraphicUnit } from '~~/types'
import { useAsyncValidator } from '~/composables/validation/useAsyncValidator'
import { required, validateState, isInteger } from '~/utils/validations'

export default function <RT extends ApiResourceMicroStratigraphicUnit>(
  item: Partial<RT>,
) {
  const uniqueMicroStratigraphicUnit = useAsyncValidator({
    prop: ['stratigraphicUnit.id', 'sample.id', 'number'],
    path: 'sample',
    message: 'Duplicate (SU, sample, number) tuple',
    item,
  })
  const rules = {
    stratigraphicUnit: [
      validateState<RT>('stratigraphicUnit', required),
      uniqueMicroStratigraphicUnit,
    ],
    sample: [
      validateState<RT>('stratigraphicUnit', required),
      uniqueMicroStratigraphicUnit,
    ],
    number: [
      validateState<RT>('number', required),
      validateState<RT>('number', isInteger),
      validateState<RT>('number', greaterThanOrEqual(1)),
      uniqueMicroStratigraphicUnit,
    ],
  }

  return (key: keyof typeof rules) => rules[key]
}
