import {
  required,
  minLength,
  containsDigit,
  containsLowerCase,
  containsUpperCase,
  containsNotAlphanumeric,
  validateState,
  sameAs,
} from '~/utils/validations'
import type { UserChangePasswordBody } from '~~/types'
export default function <RT extends UserChangePasswordBody>() {
  const rules = {
    oldPassword: [required],
    newPassword: [
      required,
      minLength(8),
      containsDigit,
      containsLowerCase,
      containsUpperCase,
      containsNotAlphanumeric,
    ],
    repeatPassword: [
      validateState<RT>('repeatPassword', required),
      sameAs<RT>('newPassword', 'repeatPassword', 'Passwords does not match'),
    ],
  }
  return (key: keyof typeof rules) => rules[key]
}
