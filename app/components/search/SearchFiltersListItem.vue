<script setup lang="ts">
import type { ApiDataResourceKey, Filter } from '~~/types'
import { API_FILTERS, RESOURCES_FILTERS_MAP } from '~/utils/consts/filters'

const props = withDefaults(
  defineProps<{
    filter: Filter
    isParent?: boolean
    resourceKey: ApiDataResourceKey
  }>(),
  { isParent: false },
)
defineEmits<{
  deleteFilter: [Filter]
}>()

const resourceFilters = RESOURCES_FILTERS_MAP[props.resourceKey]

const propertyValue = computed(() => {
  if (!isDefined(resourceFilters)) {
    console.warn(
      `No filter definition found for "${props.resourceKey}" resource`,
    )
    return props.filter.property
  }
  const resourceFilterDef = resourceFilters[props.filter.property]
  if (!isDefined(resourceFilterDef)) {
    console.warn(
      `No filter definition found for property "${props.filter.property}" in "${props.resourceKey}" resource`,
    )
    return props.filter.property
  }
  if (resourceFilterDef.propertyLabel) {
    return resourceFilterDef.propertyLabel
  }
  const filterDef = resourceFilterDef.filters[props.filter.filter]
  return filterDef?.propertyLabel || props.filter.property
})

const filterLabel = computed(() => API_FILTERS[props.filter.filter].label)
const operandValue = (operand: unknown) => {
  const filter = API_FILTERS[props.filter.filter]

  if (!isDefined(filter)) {
    console.error(`Unknown filter "${props.filter.filter}"`)
    return props.filter
  }

  if (!isLiteralObject(operand)) {
    return filter.operandToString?.(operand) || operand
  }

  if (!('operandListItemPropertyKey' in filter)) {
    console.error('Operand is an object, but no property key given')
    return operand.id
  }

  const key = API_FILTERS[props.filter.filter].operandListItemPropertyKey
  if (!(key && key in operand)) {
    console.error(`Invalid key "${key}"`)
    return operand.id
  }

  const value = operand[key]
  return filter.operandToString?.(value) || value
}
</script>

<template>
  <v-list-item :key="filter.id" data-testid="filters-list-item">
    <v-row align="center" justify="space-evenly" dense>
      <v-col cols="1">
        <v-btn
          v-if="!isParent"
          class="mb-4"
          color="error"
          icon
          variant="text"
          size="small"
          data-testid="delete-filter-button"
          @click="$emit('deleteFilter', filter)"
        >
          <v-icon icon="fas fa-minus" size="large" />
          <v-tooltip activator="parent" location="bottom"
            >Delete filter
          </v-tooltip>
        </v-btn>
      </v-col>
      <v-col>
        <v-text-field
          readonly
          :model-value="propertyValue"
          density="compact"
          variant="solo-filled"
          flat
        />
      </v-col>
      <v-col>
        <v-text-field
          readonly
          :model-value="filterLabel"
          variant="solo-filled"
          flat
          density="compact"
        />
      </v-col>
      <v-col>
        <v-text-field
          v-for="(operand, i) in filter.operands"
          :key="i"
          readonly
          density="compact"
          variant="solo-filled"
          flat
          color="secondary"
          :model-value="operandValue(operand)"
        />
      </v-col>
    </v-row>
  </v-list-item>
</template>

<style scoped></style>
