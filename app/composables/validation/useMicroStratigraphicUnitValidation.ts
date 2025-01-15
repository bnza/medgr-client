import type { ApiResourceMicroStratigraphicUnit } from '~~/types'
import { useAsyncValidator } from '~/composables/validation/useAsyncValidator'
import {
  required,
  validateState,
  greaterThanOrEqual,
  isInteger,
} from '~/utils/validations'

export default function <RT extends ApiResourceMicroStratigraphicUnit>(
  item: Partial<RT>,
) {
  const uniqueMicroStratigraphicUnit = useAsyncValidator({
    prop: ['sample.id', 'number'],
    path: 'micro_stratigraphic_units',
    message: 'Duplicate (sample, number) pair',
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
      validateState<RT>('number', isInteger),
      validateState<RT>('number', greaterThanOrEqual(1)),
      uniqueMicroStratigraphicUnit,
    ],
    inclusionsGeology: [required, isInteger, greaterThanOrEqual(0)],
    inclusionsDomesticRefuse: [required, isInteger, greaterThanOrEqual(0)],
    inclusionsOrganicRefuse: [required, isInteger, greaterThanOrEqual(0)],
    inclusionsBuildingMaterials: [required, isInteger, greaterThanOrEqual(0)],
    inclusionPercentageSum: [
      (value: number) =>
        value === 100 || 'Inclusions percentage sum is incorrect',
    ],
    depositType: [required],
  }

  return (key: keyof typeof rules) => rules[key]
}
