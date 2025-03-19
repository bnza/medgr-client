import { required } from '~/utils/validations'
export default function () {
  const rules = {
    item: [required],
    file: [required],
  }
  return (key: keyof typeof rules) => rules[key]
}
