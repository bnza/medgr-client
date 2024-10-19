import type { FetchResponse } from 'ofetch'

export const responseErrorToString = (
  response: FetchResponse<unknown>,
): string[] => {
  if (response.status === 401) {
    return ['Session expired please login']
  }
  if (!isLiteralObject(response._data)) {
    return [response.statusText]
  }
  if ([400, 404, 500].includes(response.status)) {
    return [
      isJsonLdResponseHydraError(response._data)
        ? response._data['hydra:description']
        : response.statusText,
    ]
  }
  if (response.status === 422) {
    return isJsonLdValidationResponseError(response._data)
      ? response._data.violations.map((violation) => violation.message)
      : [response.statusText]
  }
  return [response.statusText]
}
