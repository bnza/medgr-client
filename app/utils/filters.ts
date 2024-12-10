import type {
  Filter,
  FilterDefinitionObject,
  ResourceCollectionCacheKey,
  ResourcePropertyFiltersDefinitionObject,
} from '~~/types'
import { RESOURCES_FILTERS_MAP } from '~/utils/consts/filters'

type ResourceFilterDefinitionEntry = [
  string,
  ResourcePropertyFiltersDefinitionObject,
]
export const getResourceAvailableProps = (
  cacheKey: ResourceCollectionCacheKey,
  state: Record<string, Filter>,
  protectedFields: Array<string>,
) => {
  const resourceFiltersDefinitionObject =
    getResourceFiltersDefinitions(cacheKey)

  const isPropAvailable = ([
    prop,
    propFilterDefinition,
  ]: ResourceFilterDefinitionEntry) =>
    !protectedFields.includes(prop) &&
    (hasPropMultipleFilter(propFilterDefinition.filters) ||
      !isPropAlreadySet(state, prop))

  const propFilterDefinitionToMenuEntry = ([
    prop,
    propFilterDefinition,
  ]: ResourceFilterDefinitionEntry) => ({
    value: prop,
    title: propFilterDefinition.propertyLabel || prop,
  })

  return Object.entries(resourceFiltersDefinitionObject)
    .filter(isPropAvailable)
    .map(propFilterDefinitionToMenuEntry)
    .sort((a, b) => a.value.localeCompare(b.value))
}
const hasPropMultipleFilter = (
  filters: Record<string, FilterDefinitionObject>,
) => Object.values(filters).some((filter) => filter.multiple)

export const getPropertyAvailableOperators = (
  cacheKey: ResourceCollectionCacheKey,
  filters: Array<Filter>,
  prop: string,
) => {
  const resourceFiltersDefinitionObject =
    getResourceFiltersDefinitions(cacheKey)
  return Object.values(resourceFiltersDefinitionObject[prop]?.filters || {})
    .filter(
      (filterDefinitionObject) =>
        filterDefinitionObject.multiple ||
        // Operator is not already set
        !filters.some(
          (filterState) =>
            prop === filterState.property &&
            filterDefinitionObject.id === filterState.filter,
        ),
    )
    .map((filterDefinition) => ({
      value: filterDefinition.id,
      title: filterDefinition.label,
    }))
}

const isPropAlreadySet = (state: Record<number, Filter>, prop: string) => {
  return Object.values(state).some((filter: Filter) => prop === filter.property)
}

const getResourceFiltersDefinitions = (
  resourceCacheKey: ResourceCollectionCacheKey,
) => {
  const key = extractResourceKeyFromCacheKey(resourceCacheKey)
  const resourceFiltersDefinitions = RESOURCES_FILTERS_MAP[key]
  if (!resourceFiltersDefinitions) {
    console.error(
      `No resource filter definition found: keys "${resourceCacheKey}", "${key}"`,
    )
  }
  return resourceFiltersDefinitions || {}
}
