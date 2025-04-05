import type { AsyncValidationType } from '~~/types'

// const accessNestedProps = (
//   acc: Record<string, unknown> | undefined,
//   propKey: string,
// ) => {
//   return acc && acc.constructor === Object && propKey in acc
//     ? acc[propKey]
//     : undefined
// }
// const getValues =
//   (state: Record<string, unknown>) => (propAccessor: string) => {
//     const propKeys = propAccessor.split('.')
//     return propKeys.reduce(accessNestedProps, state)
//   }

const accessNestedProps =
  <T extends object>(obj: T) =>
  (path: string): any => {
    const keys = path.split('.')
    let current: any = obj

    for (const key of keys) {
      if (
        current === null ||
        typeof current !== 'object' ||
        !(key in current)
      ) {
        return undefined
      }
      current = current[key]
    }

    return current
  }
const isChanged = (oldValues: Array<unknown>, values: Array<unknown>) =>
  values.reduce((acc, value, i) => acc || value != oldValues[i], false)

const validator = useNuxtApp().$api.validator

export function useAsyncValidator({
  type = 'unique',
  prop,
  path,
  item,
  message = 'Async validation failed',
}: {
  type?: AsyncValidationType
  prop: string | Array<string>
  path: string
  item: Record<string, unknown>
  message?: string
}) {
  return async function (value: unknown) {
    let newValue = []
    if (Array.isArray(prop)) {
      if (isLiteralObject(value)) {
        newValue = prop.map(accessNestedProps(value))
        const oldValue = prop.map(accessNestedProps(item))

        if (!isChanged(oldValue, newValue)) {
          return true
        }
        if (newValue.some((v: unknown) => typeof v === 'undefined')) {
          return true
        }
      } else {
        throw new Error(
          'Multiple properties validation require an object value',
        )
      }
    } else if (value === '' || value === item?.[prop]) {
      return true
    } else {
      newValue.push(value)
    }
    return validator
      .validate(type, path, newValue)
      .then((result) => result || message)
  }
}
