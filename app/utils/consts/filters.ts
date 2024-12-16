import type {
  FilterDefinitionObject,
  FilterKey,
  ResourceFiltersDefinitionObject,
  ApiDataResourceKey,
  Filter,
} from '~~/types'
import { isApiResourceItem } from '~/utils/guards'
import { SymbolKind } from 'vscode-languageserver-types'
import Boolean = SymbolKind.Boolean

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

const dateTimeISOToDateISO = (date: unknown) => {
  if ('string' === typeof date) {
    return new Date(date).toLocaleDateString()
  }
  return ''
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

const DateEqual: Readonly<FilterDefinitionObject> = {
  id: 'DateEqual',
  label: 'equals',
  multiple: true,
  operandsComponent: 'SingleDate',
  operandsNumber: 1,
  addToObject: (filterObj, filter) => {
    filterObj[filter.property] = filter.operands[0]
  },
  operandToString: dateTimeISOToDateISO,
}

const DateAfterThan: Readonly<FilterDefinitionObject> = {
  id: 'DateAfterThan',
  label: 'after',
  multiple: false,
  operandsComponent: 'SingleDate',
  operandsNumber: 1,
  addToObject: (filterObj, filter) => {
    if (!(filter.property in filterObj)) {
      filterObj[filter.property] = []
    }
    filterObj[filter.property]['strictly_after'] = filter.operands[0]
  },
}
const DateAfterThanOrEqual: Readonly<FilterDefinitionObject> = {
  id: 'DateAfterThanOrEqual',
  label: 'after or equal',
  multiple: false,
  operandsComponent: 'SingleDate',
  operandsNumber: 1,
  addToObject: (filterObj, filter) => {
    if (!(filter.property in filterObj)) {
      filterObj[filter.property] = []
    }
    filterObj[filter.property]['after'] = filter.operands[0]
  },
}

const DateBeforeThan: Readonly<FilterDefinitionObject> = {
  id: 'DateBeforeThan',
  label: 'before',
  multiple: false,
  operandsComponent: 'SingleDate',
  operandsNumber: 1,
  addToObject: (filterObj, filter) => {
    if (!(filter.property in filterObj)) {
      filterObj[filter.property] = []
    }
    filterObj[filter.property]['strictly_before'] = filter.operands[0]
  },
}
const DateBeforeThanOrEqual: Readonly<FilterDefinitionObject> = {
  id: 'DateAfterThanOrEqual',
  label: 'before or equal',
  multiple: false,
  operandsComponent: 'SingleDate',
  operandsNumber: 1,
  addToObject: (filterObj, filter) => {
    if (!(filter.property in filterObj)) {
      filterObj[filter.property] = []
    }
    filterObj[filter.property]['before'] = filter.operands[0]
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

const BooleanEqual: Readonly<FilterDefinitionObject> = {
  id: 'BooleanEqual',
  label: 'is (true/false)',
  multiple: false,
  operandsComponent: 'BooleanEqual',
  operandsNumber: 0,
  addToObject: (filterObj, filter) => {
    filterObj[filter.property] = Number(filter.operands[0])
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

const SampleEqualAutocomplete: Readonly<FilterDefinitionObject> = {
  id: 'SampleEqualAutocomplete',
  label: 'equals',
  multiple: false,
  propertyLabel: 'sample',
  operandsComponent: 'SampleAutocomplete',
  operandListItemPropertyKey: 'code',
  operandsNumber: 1,
  addToObject: addMultiplePropEntryToFilterObject,
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
    DateEqual,
    DateAfterThan,
    DateAfterThanOrEqual,
    DateBeforeThan,
    DateBeforeThanOrEqual,
    Exists,
    SearchExact,
    SearchPartial,
    NumericEqual,
    NumericGreaterThan,
    NumericGreaterThanOrEqual,
    NumericLowerThan,
    NumericLowerThanOrEqual,
    BooleanEqual,
    BooleanIsTrue,
    BooleanIsFalse,
    SampleEqualAutocomplete,
    SiteEqualAutocomplete,
    StratigraphicUnitEqualAutocomplete,
    VocabularyPotteryPartEqualAutocomplete,
    VocabularyPotteryFunctionalGroupEqualAutocomplete,
    VocabularyPotteryTypologyEqualAutocomplete,
  }
const microStratigraphicUnit: Readonly<ResourceFiltersDefinitionObject> = {
  'stratigraphicUnit.site': {
    filters: { SiteEqualAutocomplete },
    propertyLabel: 'site',
  },
  stratigraphicUnit: {
    filters: { StratigraphicUnitEqualAutocomplete },
    propertyLabel: 'stratigraphic unit',
  },
  sample: {
    filters: { SampleEqualAutocomplete },
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
  collector: {
    filters: {
      Exists,
      SearchPartial,
    },
  },
  inclusionsGeology: {
    filters: {
      NumericEqual,
      NumericGreaterThan,
      NumericGreaterThanOrEqual,
      NumericLowerThan,
      NumericLowerThanOrEqual,
    },
    propertyLabel: 'geology (% incl.)',
  },
  inclusionsBuildingMaterials: {
    filters: {
      NumericEqual,
      NumericGreaterThan,
      NumericGreaterThanOrEqual,
      NumericLowerThan,
      NumericLowerThanOrEqual,
    },
    propertyLabel: 'building materials (% incl.)',
  },
  inclusionsDomesticRefuse: {
    filters: {
      NumericEqual,
      NumericGreaterThan,
      NumericGreaterThanOrEqual,
      NumericLowerThan,
      NumericLowerThanOrEqual,
    },
    propertyLabel: 'domestic refuse (% incl.)',
  },
  inclusionsOrganicRefuse: {
    filters: {
      NumericEqual,
      NumericGreaterThan,
      NumericGreaterThanOrEqual,
      NumericLowerThan,
      NumericLowerThanOrEqual,
    },
    propertyLabel: 'organic refuse (% incl.)',
  },
  mesofaunaRootBioturbation: {
    filters: {
      NumericEqual,
      NumericGreaterThan,
      NumericGreaterThanOrEqual,
      NumericLowerThan,
      NumericLowerThanOrEqual,
    },
    propertyLabel: 'mesofauna/root bioturbation',
  },
  earthwormInternalChamber: {
    filters: {
      NumericEqual,
      NumericGreaterThan,
      NumericGreaterThanOrEqual,
      NumericLowerThan,
      NumericLowerThanOrEqual,
    },
    propertyLabel: 'earthworm internal chamber',
  },
  organicOrganoMineral: {
    filters: {
      NumericEqual,
      NumericGreaterThan,
      NumericGreaterThanOrEqual,
      NumericLowerThan,
      NumericLowerThanOrEqual,
    },
    propertyLabel: 'organic/organo mineral',
  },
  earthwormGranule: {
    filters: {
      NumericEqual,
      NumericGreaterThan,
      NumericGreaterThanOrEqual,
      NumericLowerThan,
      NumericLowerThanOrEqual,
    },
    propertyLabel: 'earthworm granule',
  },
  lenticularPlateyPeds: {
    filters: { BooleanEqual },
    propertyLabel: 'lenticular platey peds',
  },
  crumbsOrGranule: {
    filters: { BooleanEqual },
    propertyLabel: 'crumbs or granule',
  },
  saBlockyPeds: {
    filters: { BooleanEqual },
    propertyLabel: 'SA blocky peds',
  },
  cracks: {
    filters: { BooleanEqual },
  },
  infillings: {
    filters: { BooleanEqual },
  },
}
const pottery: Readonly<ResourceFiltersDefinitionObject> = {
  'stratigraphicUnit.site': {
    filters: { SiteEqualAutocomplete },
    propertyLabel: 'site',
  },
  stratigraphicUnit: {
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
  part: {
    propertyLabel: 'part',
    filters: { VocabularyPotteryPartEqualAutocomplete, Exists },
  },
  typology: {
    propertyLabel: 'typology',
    filters: { VocabularyPotteryTypologyEqualAutocomplete },
  },
  functionalGroup: {
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
  'stratigraphicUnit.site': {
    filters: { SiteEqualAutocomplete },
    propertyLabel: 'site',
  },
  'stratigraphicUnits.stratigraphicUnit': {
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
  collector: {
    filters: {
      Exists,
      SearchPartial,
    },
  },
  takingDate: {
    filters: {
      Exists,
      DateEqual,
      DateAfterThan,
      DateAfterThanOrEqual,
      DateBeforeThan,
      DateBeforeThanOrEqual,
    },
    propertyLabel: 'date taken',
  },
  description: {
    filters: { SearchPartial },
  },
}
export const RESOURCES_FILTERS_MAP: Readonly<
  Partial<Record<ApiDataResourceKey, ResourceFiltersDefinitionObject>>
> = {
  microStratigraphicUnit,
  pottery,
  sample,
  site,
  stratigraphicUnit,
}
