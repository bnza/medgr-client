<script setup lang="ts">
import type {
  ApiAction,
  ApiResourceStratigraphicUnit,
  ResourceCollectionParent,
  ResourceConfig,
} from '~~/types'
import type ResourceRepository from '~/utils/repository/ResourceRepository'
import usePotteryValidation from '~/composables/validation/usePotteryValidation'

const props = defineProps<{
  mode: ApiAction
  item: ApiResourceStratigraphicUnit
  repository: ResourceRepository<ApiResourceStratigraphicUnit>
  resourceConfig: ResourceConfig
  parent?: ResourceCollectionParent
}>()

const { isAuthenticated, readonly, state } =
  useResourceItemForm<ApiResourceStratigraphicUnit>(props.mode, props.item)

if (props.mode === 'create' && props.parent) {
  Object.assign(state, Object.fromEntries([props.parent]))
}

const getRules = readonly.value
  ? (_: string) => undefined
  : usePotteryValidation(props.item)

const normalizePost = (item: Partial<ApiResourceStratigraphicUnit>) => {
  item = clone(item)
  if (isApiResourceItem(item?.stratigraphicUnit)) {
    item.stratigraphicUnit = item.stratigraphicUnit['@id']
  }
  if (item?.number) {
    item.number = Number(item.number)
  }
  if (item?.fragmentsNumber) {
    item.fragmentsNumber = Number(item.fragmentsNumber)
  }
  return item
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
          <v-col cols="12" xs="12" sm="2" class="px-2">
            <v-text-field
              v-model="state.projectIdentifier"
              label="project identifier"
            />
          </v-col>
          <v-spacer />
          <v-col cols="12" xs="12" sm="2" class="px-2">
            <v-text-field
              v-model="state.fragmentsNumber"
              :rules="getRules('fragmentsNumber')"
              label="number of fragments"
            />
          </v-col>
        </v-row>
      </data-expansion-panel>
      <data-expansion-panel value="description" title="description">
        <v-row>
          <v-col cols="12" xs="12" sm="4" class="px-2">
            <lazy-api-vocabulary-autocomplete
              v-model="state.part"
              label="part"
              :vocabulary-key="'vocabularyPotteryPart'"
            />
          </v-col>
          <v-col cols="12" xs="12" sm="4" class="px-2">
            <lazy-api-vocabulary-autocomplete
              v-model="state.functionalGroup"
              label="functional group"
              :rules="getRules('functionalGroup')"
              :vocabulary-key="'vocabularyPotteryFunctionalGroup'"
            />
          </v-col>
          <v-col cols="12" xs="12" sm="4" class="px-2">
            <lazy-api-vocabulary-autocomplete
              v-model="state.typology"
              label="typology"
              :rules="getRules('typology')"
              :vocabulary-key="'vocabularyPotteryTypology'"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" xs="12" class="px-2">
            <v-textarea v-model="state.description" label="description" />
          </v-col>
        </v-row>
      </data-expansion-panel>
    </v-expansion-panels>
  </lazy-data-item-form>
</template>
