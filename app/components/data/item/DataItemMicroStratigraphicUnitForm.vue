<script setup lang="ts">
import type {
  ApiAction,
  ApiResourceMicroStratigraphicUnit,
  ApiSubmitResourceMicroStratigraphicUnit,
  ResourceCollectionParent,
  ResourceConfig,
} from '~~/types'
import type ResourceRepository from '~/utils/repository/ResourceRepository'

import useMicroStratigraphicUnitValidation from '~/composables/validation/useMicroStratigraphicUnitValidation'

const props = defineProps<{
  mode: ApiAction
  item: ApiResourceMicroStratigraphicUnit
  repository: ResourceRepository<ApiResourceMicroStratigraphicUnit>
  resourceConfig: ResourceConfig
  parent?: ResourceCollectionParent
}>()

const { readonly, state } =
  useResourceItemForm<ApiResourceMicroStratigraphicUnit>(props.mode, props.item)

if (props.mode === 'create' && props.parent) {
  Object.assign(state, Object.fromEntries([props.parent]))
}

const getRules = readonly.value
  ? (_: string) => undefined
  : useMicroStratigraphicUnitValidation(props.item)

const normalizePost = (item: Partial<ApiResourceMicroStratigraphicUnit>) => {
  const newItem: ApiSubmitResourceMicroStratigraphicUnit = {
    ...clone(item),
    stratigraphicUnit: '',
    sample: '',
  }
  if (isApiLdResourceItem(item?.stratigraphicUnit)) {
    newItem.stratigraphicUnit = item.stratigraphicUnit['@id']
  }
  if (isApiLdResourceItem(item?.sample)) {
    newItem.sample = item.sample['@id']
  }
  const numericFields = [
    'number',
    'inclusionsGeology',
    'inclusionsBuildingMaterials',
    'inclusionsDomesticRefuse',
    'inclusionsOrganicRefuse',
  ]
  numericFields.forEach((prop) => {
    if (newItem?.[prop]) {
      newItem[prop] = Number(newItem[prop])
    }
  })
  return newItem
}
useResourceItemNormalizeSubmit(props.mode, props.item, state, normalizePost)

const inclusionsPercentageSum = computed(
  () =>
    Number(state.inclusionsGeology) +
    Number(state.inclusionsDomesticRefuse) +
    Number(state.inclusionsOrganicRefuse) +
    Number(state.inclusionsBuildingMaterials),
)

const panel = ref([
  'identification',
  'description',
  'inclusions',
  'microstructure',
  'excremental',
])
</script>

<template>
  <lazy-data-item-form :item :mode :readonly :repository :resource-config>
    <v-expansion-panels v-model="panel" variant="accordion" multiple flat>
      <data-expansion-panel value="identification" title="identification">
        <v-row>
          <v-col cols="12" xs="12" sm="4" class="px-2">
            <api-resource-stratigraphic-unit-autocomplete
              v-model="state.stratigraphicUnit"
              :disabled="mode === 'update'"
              :validation-value="state"
              :rules="getRules('stratigraphicUnit')"
            />
          </v-col>
          <v-col cols="12" xs="12" sm="4" class="px-2">
            <api-resource-sample-autocomplete
              v-model="state.sample"
              readonly
              :disabled="mode === 'update'"
              :validation-value="state"
              :rules="getRules('sample')"
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
          <v-col cols="12" xs="12" md="6" class="px-2">
            <v-text-field
              v-model="state.depositType"
              label="deposit type"
              :rules="getRules('depositType')"
            />
          </v-col>
          <v-col cols="12" xs="12" md="6" class="px-2">
            <v-text-field
              v-model="state.keyAttributes"
              label="key attributes"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" xs="12" md="4" class="px-2">
            <v-text-field v-model="state.colourPpl" label="PPL colour" />
          </v-col>
          <v-col cols="12" xs="12" md="4" class="px-2">
            <v-text-field v-model="state.colourXpl" label="XPL colour" />
          </v-col>
          <v-col cols="12" xs="12" md="4" class="px-2">
            <v-text-field v-model="state.colourOil" label="OIL colour" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" xs="12" class="px-2">
            <v-textarea v-model="state.interpretation" label="interpretation" />
          </v-col>
        </v-row>
      </data-expansion-panel>
      <data-expansion-panel value="inclusions" title="inclusions (%)">
        <v-row>
          <v-col cols="3" class="px-2">
            <v-text-field
              v-model="state.inclusionsGeology"
              :rules="getRules('inclusionsGeology')"
              label="geology"
              suffix="%"
            />
          </v-col>
          <v-col cols="3" class="px-2">
            <v-text-field
              v-model="state.inclusionsBuildingMaterials"
              :rules="getRules('inclusionsBuildingMaterials')"
              label="building materials"
              suffix="%"
            />
          </v-col>
          <v-col cols="3" class="px-2">
            <v-text-field
              v-model="state.inclusionsDomesticRefuse"
              :rules="getRules('inclusionsDomesticRefuse')"
              label="domestic refuse"
              suffix="%"
            />
          </v-col>
          <v-col cols="3" class="px-2">
            <v-text-field
              v-model="state.inclusionsOrganicRefuse"
              :rules="getRules('inclusionsOrganicRefuse')"
              label="organic refuse"
              suffix="%"
            />
          </v-col>
        </v-row>
        <v-row dense>
          <v-input
            :model-value="inclusionsPercentageSum"
            :rules="getRules('inclusionPercentageSum')"
            validate-on="eager"
            suffix="%"
          />
        </v-row>
      </data-expansion-panel>
      <data-expansion-panel
        value="microstructure"
        title="microstructure effects"
      >
        <v-row>
          <v-col cols="1" class="px-2" />
          <v-col cols="2" class="px-2">
            <v-checkbox
              v-model="state.lenticularPlateyPeds"
              label="lenticular platey peds"
            />
          </v-col>
          <v-col cols="2" class="px-2">
            <v-checkbox
              v-model="state.crumbsOrGranules"
              label="crumbs or granules"
            />
          </v-col>
          <v-col cols="2" class="px-2">
            <v-checkbox v-model="state.saBlockyPeds" label="SA blocky peds" />
          </v-col>
          <v-col cols="2" class="px-2">
            <v-checkbox v-model="state.cracks" label="cracks" />
          </v-col>
          <v-col cols="2" class="px-2">
            <v-checkbox v-model="state.infillings" label="infillings" />
          </v-col>
          <v-col cols="1" class="px-2" />
        </v-row>
        <v-row>
          <v-col cols="1" class="px-2" />
          <v-col cols="3" class="px-2">
            <data-rating-field
              v-model="state.mesofaunaRootBioturbation"
              :readonly
              label="mesofaunal/root bioturbation"
            />
          </v-col>
        </v-row>
      </data-expansion-panel>
      <data-expansion-panel
        value="excremental"
        title="excremental pedofeatures"
      >
        <v-row>
          <v-col cols="1" class="px-2" />
          <v-col cols="3" class="px-2">
            <v-col cols="3" class="px-2">
              <data-rating-field
                v-model="state.earthwormInternalChamber"
                :readonly
                label="earthworm internal chamber"
              />
            </v-col>
          </v-col>
          <v-col cols="3" class="px-2">
            <data-rating-field
              v-model="state.organicOrganoMineral"
              :readonly
              label="organic/organo mineral"
            />
          </v-col>
          <v-col cols="3" class="px-2">
            <data-rating-field
              v-model="state.earthwormGranule"
              :readonly
              label="earthworm granule"
            />
          </v-col>
        </v-row>
      </data-expansion-panel>
    </v-expansion-panels>
  </lazy-data-item-form>
</template>
