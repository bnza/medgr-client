import { required } from '~/utils/validations'

export default function () {
  const rules = {
    property: [required],
    filter: [required],
  }
  return (key: keyof typeof rules) => rules[key]
}
