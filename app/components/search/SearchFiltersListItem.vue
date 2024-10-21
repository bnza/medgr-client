<script setup lang="ts">
import type { Filter } from '~~/types'
import { API_FILTERS } from '~/utils/consts/filters'

const props = defineProps<{ filter: Filter }>()
defineEmits<{
  deleteFilter: [Filter]
}>()
const propertyValue = computed(() => {
  if (!props.filter?.filter) {
    return props.filter.property
  }
  const filterDef = API_FILTERS[props.filter.filter]
  return filterDef.propertyLabel || props.filter.property
})

const filterLabel = computed(() => API_FILTERS[props.filter.filter].label)
const operandValue = (operand: unknown) => {
  if (!isLiteralObject(operand)) {
    return operand
  }
  if (!(props.filter.filter in API_FILTERS)) {
    console.error(`Unknown filter "${props.filter.filter}"`)
    return operand.id
  }
  if (!('operandListItemPropertyKey' in API_FILTERS[props.filter.filter])) {
    console.error('Operand is an object, but no property key given')
    return operand.id
  }
  const key = API_FILTERS[props.filter.filter].operandListItemPropertyKey
  if (!(key && key in operand)) {
    console.error(`Invalid key "${key}"`)
    return operand.id
  }
  return operand[key]
}
</script>

<template>
  <v-list-item :key="filter.id" data-testid="filters-list-item">
    <v-row align="center" justify="space-evenly" dense>
      <v-col cols="1">
        <v-btn
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
