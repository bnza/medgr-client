import type {
  ApiDataResourceKey,
  ResourceCollectionCacheKey,
  Writeable,
} from '~~/types'

export * from './consts'

export const routeParamIdToString = (id: string | Array<string>) =>
  Array.isArray(id) ? id[0] : id

export const routeParamId = (id: string | Array<string> | undefined) => {
  if ('undefined' === typeof id) {
    return
  }
  const _id = routeParamIdToString(id)
  return _id ? (Number.isNaN(Number(_id)) ? _id : parseInt(_id)) : undefined
}
export const clone = <T extends Record<string, any>>(
  item: MaybeRef<T>,
): Writeable<T> => JSON.parse(JSON.stringify(unref(item)))

export const extractResourceKeyFromCacheKey = (
  key: ResourceCollectionCacheKey,
): ApiDataResourceKey => key.replace(/\/.+/, '')

export const camelToSnakeCase = (str: string): string => {
  if (!str) {
    return str
  }
  const firstLetter = str.charAt(0)
  const rest = str.substring(1)

  return (
    firstLetter.toLowerCase() +
    rest.replace(/([A-Z])/g, (_, p1) => '_' + p1.toLowerCase())
  )
}
