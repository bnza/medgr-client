export const routeParamIdToString = (id: string | Array<string>) =>
  Array.isArray(id) ? id[0] : id

export const routeParamId = (id: string | Array<string> | undefined) => {
  if ('undefined' === typeof id) {
    return
  }
  const _id = routeParamIdToString(id)
  return _id ? (Number.isNaN(Number(_id)) ? _id : parseInt(_id)) : undefined
}
export const clone = <T extends Record<string, any>>(item: MaybeRef<T>): T =>
  JSON.parse(JSON.stringify(unref(item)))