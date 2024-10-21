import type { VocabularyResourceKey } from '~~/types/api'

export type FilterKey =
  | 'SearchExact'
  | 'SearchPartial'
  | 'Exists'
  | 'NumericEqual'
  | 'NumericGreaterThan'
  | 'NumericGreaterThanOrEqual'
  | 'NumericLowerThan'
  | 'NumericLowerThanOrEqual'
  | 'SiteEqualAutocomplete'
  | 'StratigraphicUnitEqualAutocomplete'
  | 'VocabularyPotteryPartEqualAutocomplete'
  | 'VocabularyPotteryTypologyEqualAutocomplete'
  | 'VocabularyPotteryFunctionalGroupEqualAutocomplete'
  | 'BooleanIsTrue'
  | 'BooleanIsFalse'

export type Filter = {
  id?: string
  property: string
  filter: FilterKey
  operands: Array<string | number>
}

export type FilterNumericMap = { [n: number]: Filter }

export type FilterDefinitionObject = {
  id: FilterKey
  label: string
  multiple: boolean
  propertyLabel?: string
  operandsComponent: string
  operandComponentVocabularyKey?: VocabularyResourceKey
  operandListItemPropertyKey?: string
  operandsNumber: number
  addToObject: (filterObject: Record<string, any>, filter: Filter) => void
}

type ResourcePropertyFiltersDefinitionObject = {
  propertyLabel?: string
  filters: Record<string, FilterDefinitionObject>
}

type ResourceFiltersDefinitionObject = Record<
  string,
  ResourcePropertyFiltersDefinitionObject
>
