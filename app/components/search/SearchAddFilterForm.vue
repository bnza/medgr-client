<script setup lang="ts">
import type { Filter, ApiVocabularyResourceKey } from '~~/types'
import type { VForm } from 'vuetify/components'
import useFilterValidation from '~/composables/validation/useFilterValidation'
import { injectResourceCollectionFilters } from '~/composables/useResourceCollectionFilters'
import { API_FILTERS } from '~/utils/consts/filters'

const form = useTemplateRef<VForm>('form')

const {
  setFilter,
  availableProperties,
  getAvailableOperators,
  isAddFilterDialogOpen,
} = injectResourceCollectionFilters()

const getRules = useFilterValidation()

const filter: Partial<Filter> = reactive({
  property: undefined,
  filter: undefined,
  operands: [],
})

const availableOperators = ref([] as ReturnType<typeof getAvailableOperators>)

watch(
  () => filter.property,
  (prop) => {
    if (prop) {
      availableOperators.value = getAvailableOperators(prop)
      filter.filter = undefined
    }
  },
  {
    immediate: true,
  },
)

const operandsComponent = shallowRef<ReturnType<typeof resolveComponent>>()

const operandsComponentsMap = {
  Exists: resolveComponent('SearchOperandBoolean'),
  Single: resolveComponent('SearchOperandSingle'),
  SingleDate: resolveComponent('SearchOperandSingleDate'),
  SingleNumeric: resolveComponent('SearchOperandSingleNumeric'),
  SiteAutocomplete: resolveComponent('SearchOperandSiteAutocomplete'),
  StratigraphicUnitAutocomplete: resolveComponent(
    'SearchOperandStratigraphicUnitAutocomplete',
  ),
  VocabularyAutocomplete: resolveComponent(
    'SearchOperandVocabularyAutocomplete',
  ),
}

const operandsComponentsVocabularyKey = ref<
  ApiVocabularyResourceKey | undefined
>()

watch(
  () => filter.filter,
  (newFilter, oldFilter) => {
    if (newFilter) {
      if (!(newFilter in API_FILTERS)) {
        throw new Error(`Invalid filter key "${newFilter}"`)
      }
      const filterObject = API_FILTERS[newFilter]
      if (!(filterObject.operandsComponent in operandsComponentsMap)) {
        throw new Error(
          `Invalid filter component key "${filterObject.operandsComponent}"`,
        )
      }
      operandsComponent.value =
        operandsComponentsMap[filterObject.operandsComponent]
      operandsComponentsVocabularyKey.value =
        filterObject.operandComponentVocabularyKey
    }
    if (!oldFilter) {
      return
    }
    filter.operands = []
  },
  {
    immediate: true,
  },
)

const submit = () => {
  form.value?.validate()
  const isFilter = (value: any): value is Filter => Boolean(form.value?.isValid)
  if (!isFilter(filter)) {
    return
  }
  setFilter(filter)
  isAddFilterDialogOpen.value = false
}

defineExpose({ submit })
</script>

<template>
  <v-form ref="form" @submit.prevent>
    <v-container>
      <v-row>
        <v-col>
          <v-select
            v-model="filter.property"
            :rules="getRules('property')"
            :items="availableProperties"
            label="property"
          />
        </v-col>
        <v-col>
          <v-select
            v-if="filter.property"
            v-model="filter.filter"
            :rules="getRules('filter')"
            :items="availableOperators"
            label="operator"
          />
        </v-col>
        <v-col>
          <component
            :is="operandsComponent"
            v-if="operandsComponent"
            v-model="filter.operands"
            :vocabulary-key="operandsComponentsVocabularyKey"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
