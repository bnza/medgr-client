import { required, each } from '~/utils/validations'
export default function () {
  const rules = {
    item: [required],
    file: [each(required)],
  }
  return (key: keyof typeof rules) => rules[key]
}
