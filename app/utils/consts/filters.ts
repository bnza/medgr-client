import type {
  FilterDefinitionObject,
  FilterKey,
  ResourceFiltersDefinitionObject,
  ApiDataResourceKey,
  Filter,
} from '~~/types'
import { isApiResourceItem } from '~/utils/guards'

const addMultiplePropEntryToFilterObject = (
  filterObj: Record<string, any>,
  filter: Filter,
) => {
  if (!filterObj[filter.property]) {
    filterObj[filter.property] = []
  }
  if (!Array.isArray(filterObj[filter.property])) {
    console.warn(
      `Filter object property "${filter.property}" already set as "${typeof filter.property}". Skipped`,
    )
    return
  }
  if (filter.operands.length === 0) {
    console.warn('No operands provided. Skipped')
  }
  filterObj[filter.property].push(
    isApiResourceItem(filter.operands[0])
      ? filter.operands[0].id
      : filter.operands[0],
  )
}

const SearchExact: Readonly<FilterDefinitionObject> = {
  id: 'SearchExact',
  label: 'equals',
  multiple: true,
  operandsComponent: 'Single',
  operandsNumber: 1,
  addToObject: (filterObj, filter) => {
    if (!(filter.property in filterObj)) {
      filterObj[filter.property] = []
    }
    filterObj[filter.property].push(filter.operands[0])
  },
}

const SearchPartial: Readonly<FilterDefinitionObject> = {
  id: 'SearchPartial',
  label: 'contains',
  multiple: false,
  operandsComponent: 'Single',
  operandsNumber: 1,
  addToObject: (filterObj, filter) => {
    filterObj[filter.property] = filter.operands[0]
  },
}

const NumericEqual: Readonly<FilterDefinitionObject> = {
  id: 'NumericEqual',
  label: 'equals',
  multiple: false,
  operandsComponent: 'SingleNumeric',
  operandsNumber: 1,
  addToObject: (filterObj, filter) => {
    filterObj[filter.property] = filter.operands[0]
  },
}

const NumericGreaterThan: Readonly<FilterDefinitionObject> = {
  id: 'NumericGreaterThan',
  label: 'greater than',
  multiple: false,
  operandsComponent: 'SingleNumeric',
  operandsNumber: 1,
  addToObject: (filterObj, filter) => {
    if (!(filter.property in filterObj)) {
      filterObj[filter.property] = []
    }
    filterObj[filter.property]['gt'] = filter.operands[0]
  },
}

const NumericGreaterThanOrEqual: Readonly<FilterDefinitionObject> = {
  id: 'NumericGreaterThanOrEqual',
  label: 'greater than or equal',
  multiple: false,
  operandsComponent: 'SingleNumeric',
  operandsNumber: 1,
  addToObject: (filterObj, filter) => {
    if (!(filter.property in filterObj)) {
      filterObj[filter.property] = []
    }
    filterObj[filter.property]['gte'] = filter.operands[0]
  },
}

const NumericLowerThan: Readonly<FilterDefinitionObject> = {
  id: 'NumericLowerThan',
  label: 'lower than',
  multiple: false,
  operandsComponent: 'SingleNumeric',
  operandsNumber: 1,
  addToObject: (filterObj, filter) => {
    if (!(filter.property in filterObj)) {
      filterObj[filter.property] = []
    }
    filterObj[filter.property]['lt'] = filter.operands[0]
  },
}

const NumericLowerThanOrEqual: Readonly<FilterDefinitionObject> = {
  id: 'NumericLowerThanOrEqual',
  label: 'lower than or equal',
  multiple: false,
  operandsComponent: 'SingleNumeric',
  operandsNumber: 1,
  addToObject: (filterObj, filter) => {
    if (!(filter.property in filterObj)) {
      filterObj[filter.property] = []
    }
    filterObj[filter.property]['lte'] = filter.operands[0]
  },
}

const Exists: Readonly<FilterDefinitionObject> = {
  id: 'Exists',
  label: 'is empty',
  multiple: false,
  operandsComponent: 'Exists',
  operandsNumber: 0,
  addToObject: (filterObj, filter) => {
    if (!('exists' in filterObj)) {
      filterObj['exists'] = []
    }
    // exists filter does not support . notation
    filterObj['exists'][filter.property.replace(/(\..+)/, '')] =
      !filter.operands[0]
  },
}

const BooleanIsTrue: Readonly<FilterDefinitionObject> = {
  id: 'BooleanIsTrue',
  label: 'is true',
  multiple: false,
  operandsComponent: '',
  operandsNumber: 0,
  addToObject: (filterObj, filter) => {
    filterObj[filter.property] = 1
  },
}

const BooleanIsFalse: Readonly<FilterDefinitionObject> = {
  id: 'BooleanIsFalse',
  label: 'is false',
  multiple: false,
  operandsComponent: '',
  operandsNumber: 0,
  addToObject: (filterObj, filter) => {
    filterObj[filter.property] = 0
  },
}

const SiteEqualAutocomplete: Readonly<FilterDefinitionObject> = {
  id: 'SiteEqualAutocomplete',
  label: 'equals',
  multiple: false,
  propertyLabel: 'site',
  operandsComponent: 'SiteAutocomplete',
  operandListItemPropertyKey: 'name',
  operandsNumber: 1,
  addToObject: addMultiplePropEntryToFilterObject,
}

const StratigraphicUnitEqualAutocomplete: Readonly<FilterDefinitionObject> = {
  id: 'StratigraphicUnitEqualAutocomplete',
  label: 'equals',
  multiple: false,
  propertyLabel: 'SU',
  operandsComponent: 'StratigraphicUnitAutocomplete',
  operandListItemPropertyKey: 'code',
  operandsNumber: 1,
  addToObject: addMultiplePropEntryToFilterObject,
}
const VocabularyPotteryTypologyEqualAutocomplete: Readonly<FilterDefinitionObject> =
  {
    id: 'VocabularyPotteryTypologyEqualAutocomplete',
    label: 'equals',
    multiple: true,
    propertyLabel: 'typology',
    operandsComponent: 'VocabularyAutocomplete',
    operandComponentVocabularyKey: 'vocabularyPotteryTypology',
    operandListItemPropertyKey: 'value',
    operandsNumber: 1,
    addToObject: addMultiplePropEntryToFilterObject,
  }

const VocabularyPotteryFunctionalGroupEqualAutocomplete: Readonly<FilterDefinitionObject> =
  {
    id: 'VocabularyPotteryFunctionalGroupEqualAutocomplete',
    label: 'equals',
    multiple: true,
    propertyLabel: 'functional group',
    operandsComponent: 'VocabularyAutocomplete',
    operandComponentVocabularyKey: 'vocabularyPotteryFunctionalGroup',
    operandListItemPropertyKey: 'value',
    operandsNumber: 1,
    addToObject: addMultiplePropEntryToFilterObject,
  }

const VocabularyPotteryPartEqualAutocomplete: Readonly<FilterDefinitionObject> =
  {
    id: 'VocabularyPotteryPartEqualAutocomplete',
    label: 'equals',
    multiple: true,
    propertyLabel: 'functional group',
    operandsComponent: 'VocabularyAutocomplete',
    operandComponentVocabularyKey: 'vocabularyPotteryFunctionalGroup',
    operandListItemPropertyKey: 'value',
    operandsNumber: 1,
    addToObject: addMultiplePropEntryToFilterObject,
  }

export const API_FILTERS: Readonly<Record<FilterKey, FilterDefinitionObject>> =
  {
    Exists,
    SearchExact,
    SearchPartial,
    NumericEqual,
    NumericGreaterThan,
    NumericGreaterThanOrEqual,
    NumericLowerThan,
    NumericLowerThanOrEqual,
    BooleanIsTrue,
    BooleanIsFalse,
    SiteEqualAutocomplete,
    StratigraphicUnitEqualAutocomplete,
    VocabularyPotteryPartEqualAutocomplete,
    VocabularyPotteryFunctionalGroupEqualAutocomplete,
    VocabularyPotteryTypologyEqualAutocomplete,
  }

const pottery: Readonly<ResourceFiltersDefinitionObject> = {
  'site.id': {
    filters: { SiteEqualAutocomplete },
    propertyLabel: 'site',
  },
  'stratigraphicUnit.id': {
    filters: { StratigraphicUnitEqualAutocomplete },
    propertyLabel: 'stratigraphic unit',
  },
  number: {
    filters: {
      NumericEqual,
      NumericGreaterThan,
      NumericGreaterThanOrEqual,
      NumericLowerThan,
      NumericLowerThanOrEqual,
    },
  },
  fragmentsNumber: {
    propertyLabel: 'fragments number',
    filters: {
      NumericEqual,
      NumericGreaterThan,
      NumericGreaterThanOrEqual,
      NumericLowerThan,
      NumericLowerThanOrEqual,
    },
  },
  projectIdentifier: {
    propertyLabel: 'project identifier',
    filters: {
      SearchPartial,
      Exists,
    },
  },
  chronologyLower: {
    propertyLabel: 'chronology (lower)',
    filters: {
      NumericEqual,
      NumericGreaterThan,
      NumericGreaterThanOrEqual,
      NumericLowerThan,
      NumericLowerThanOrEqual,
      Exists,
    },
  },
  chronologyUpper: {
    propertyLabel: 'chronology (upper)',
    filters: {
      NumericEqual,
      NumericGreaterThan,
      NumericGreaterThanOrEqual,
      NumericLowerThan,
      NumericLowerThanOrEqual,
      Exists,
    },
  },
  'part.id': {
    propertyLabel: 'part',
    filters: { VocabularyPotteryPartEqualAutocomplete, Exists },
  },
  'typology.id': {
    propertyLabel: 'typology',
    filters: { VocabularyPotteryTypologyEqualAutocomplete },
  },
  'functionalGroup.id': {
    propertyLabel: 'functional group',
    filters: { VocabularyPotteryFunctionalGroupEqualAutocomplete },
  },
  description: {
    filters: { SearchPartial },
  },
}

const site: Readonly<ResourceFiltersDefinitionObject> = {
  code: {
    filters: { SearchExact },
  },
  name: {
    filters: { SearchPartial },
  },
  description: {
    filters: { SearchPartial },
  },
  public: {
    filters: { BooleanIsFalse, BooleanIsTrue },
  },
}

const stratigraphicUnit: Readonly<ResourceFiltersDefinitionObject> = {
  year: {
    filters: {
      NumericEqual,
      NumericGreaterThan,
      NumericGreaterThanOrEqual,
      NumericLowerThan,
      NumericLowerThanOrEqual,
    },
  },
  number: {
    filters: {
      NumericEqual,
      NumericGreaterThan,
      NumericGreaterThanOrEqual,
      NumericLowerThan,
      NumericLowerThanOrEqual,
    },
  },
  description: {
    filters: { SearchPartial },
  },
  interpretation: {
    filters: { SearchPartial },
  },
  site: {
    filters: { SiteEqualAutocomplete },
  },

  public: {
    filters: { BooleanIsFalse, BooleanIsTrue },
  },
}

const sample: Readonly<ResourceFiltersDefinitionObject> = {
  'stratigraphicUnit.site.id': {
    filters: { SiteEqualAutocomplete },
    propertyLabel: 'site',
  },
  'stratigraphicUnit.id': {
    filters: { StratigraphicUnitEqualAutocomplete },
    propertyLabel: 'SU',
  },
  number: {
    filters: {
      NumericEqual,
      NumericGreaterThan,
      NumericGreaterThanOrEqual,
      NumericLowerThan,
      NumericLowerThanOrEqual,
    },
  },
  description: {
    filters: { SearchPartial },
  },
}
export const RESOURCE_PAGES_STATE: Readonly<
  Partial<Record<ApiDataResourceKey, ResourceFiltersDefinitionObject>>
> = {
  // pottery,
  // samples,
  site,
  stratigraphicUnit,
}
