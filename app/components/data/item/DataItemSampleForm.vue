<script setup lang="ts">
import type {
  ApiAction,
  ApiResourceCollectionParent,
  ApiResourceSample,
  ResourceConfig,
} from '~~/types'
import type ResourceRepository from '~/utils/repository/ResourceRepository'

import useSampleValidation from '~/composables/validation/useSampleValidation'
import useAppDate from '~/composables/useAppDate'

const props = defineProps<{
  mode: ApiAction
  item: ApiResourceSample
  repository: ResourceRepository<ApiResourceSample>
  resourceConfig: ResourceConfig
  parent?: ApiResourceCollectionParent
}>()

const { parse } = useAppDate()
const normalizeState = (state: ApiResourceSample) => {
  state.takingDate = parse(state.takingDate)
  return state
}

const { readonly, state } = useResourceItemForm<ApiResourceSample>(
  props.mode,
  props.item,
  normalizeState,
)

state.takingDate = parse(state.takingDate)

if (props.mode === 'create' && props.parent) {
  const parent = props.parent
  if (
    props.parent &&
    props.parent[0] === 'stratigraphicUnits.stratigraphicUnit'
  ) {
    parent[0] = 'stratigraphicUnit'
  }
  Object.assign(state, Object.fromEntries([parent]))
}

const getRules = readonly.value
  ? (_: string) => undefined
  : useSampleValidation(props.item)

const normalizePost = (item: Partial<ApiResourceSample>) => {
  const newItem = { ...clone(item), stratigraphicUnit: '' }
  if (isApiResourceItem(item?.stratigraphicUnit)) {
    newItem.stratigraphicUnit = item.stratigraphicUnit['@id']
  }
  if (newItem?.number) {
    newItem.number = Number(newItem.number)
  }
  return newItem
}
useResourceItemNormalizeSubmit(props.mode, props.item, state, normalizePost)

const panel = ref(['identification', 'description'])
</script>

<template>
  <lazy-data-item-form :item :mode :readonly :repository :resource-config>
    <v-expansion-panels v-model="panel" variant="accordion" multiple flat>
      <data-expansion-panel value="identification" title="identification">
        <v-row>
          <v-col cols="12" xs="12" sm="4" class="px-2">
            <api-resource-stratigraphic-unit-autocomplete
              v-model="state.stratigraphicUnit"
              readonly
              :disabled="mode === 'update'"
              :validation-value="state"
              :rules="getRules('stratigraphicUnit')"
            />
          </v-col>
          <v-col cols="12" xs="12" sm="2" class="px-2">
            <v-text-field
              v-model="state.number"
              :rules="getRules('number')"
              :validation-value="state"
              :disabled="mode === 'update'"
              label="number"
            />
          </v-col>
        </v-row>
      </data-expansion-panel>
      <data-expansion-panel value="description" title="description">
        <v-row>
          <v-col cols="12" xs="12" class="px-2">
            <v-textarea v-model="state.description" label="description" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" xs="12" sm="6" class="px-2">
            <v-text-field v-model="state.collector" label="collector" />
          </v-col>
          <v-col cols="12" xs="12" sm="6" class="px-2">
            <date-field-picker
              v-model="state.takingDate as Date | undefined"
              :readonly
              label="date taken"
            />
          </v-col>
        </v-row>
      </data-expansion-panel>
    </v-expansion-panels>
  </lazy-data-item-form>
</template>
