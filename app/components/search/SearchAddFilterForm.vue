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

watch(
  () => filter.filter,
  (_, oldFilter) => {
    if (!oldFilter) {
      return
    }
    filter.operands = []
  },
  {
    immediate: true,
  },
)

type OperandKey = keyof typeof operandsComponentsMap
const operandsComponentsMap = {
  Single: resolveComponent('SearchOperandSingle'),
  SingleNumeric: resolveComponent('SearchOperandSingleNumeric'),
  SiteAutocomplete: resolveComponent('SearchOperandSiteAutocomplete'),
}

const operandsComponentsVocabularyKey = ref<
  ApiVocabularyResourceKey | undefined
>(undefined)
const operandsComponent = computed(() => {
  const operatorId = filter.filter
  if (!operatorId) {
    return ''
  }
  const operatorObject = API_FILTERS[operatorId]
  const operandsKey = operatorObject.operandsComponent
  const isOperandKey = (key: string): key is OperandKey =>
    key in operandsComponentsMap
  if (!isOperandKey(operandsKey)) {
    throw new Error(`Invalid component key "${operandsKey}"`)
  }
  // operandsComponentsVocabularyKey.value =
  //   operatorObject.operandComponentVocabularyKey
  return operandsComponentsMap[operandsKey]
})

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
