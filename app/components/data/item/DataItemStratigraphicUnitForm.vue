<script setup lang="ts">
import type {
  ApiAction,
  ApiResourceStratigraphicUnit,
  ResourceCollectionParent,
  ResourceConfig,
} from '~~/types'
import useResourceItemForm from '~/composables/useResourceItemForm'
import type ResourceRepository from '~/utils/repository/ResourceRepository'
import useResourceItemNormalizeSubmit from '~/composables/useResourceItemNormalizeSubmit'
import useStratigraphicUnitValidation from '~/composables/validation/useStratigraphicUnitValidation'

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
  : useStratigraphicUnitValidation(props.item)

const normalizePost = (item: Partial<ApiResourceStratigraphicUnit>) => {
  item = clone(item)
  if (isApiResourceItem(item?.site)) {
    item.site = item.site['@id']
  }
  if (item?.year) {
    item.year = Number(item.year)
  }
  if (item?.number) {
    item.number = Number(item.number)
  }
  return item
}
useResourceItemNormalizeSubmit(props.mode, props.item, state, normalizePost)
</script>

<template>
  <lazy-data-item-form :item :mode :readonly :repository :resource-config>
    <v-row v-if="isAuthenticated" no-gutters justify="end">
      <v-col cols="12" sm="3" class="px-2">
        <v-checkbox v-model="state.public" label="public" />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" xs="6" sm="4" class="px-2">
        <api-resource-site-autocomplete
          v-model="state.site"
          :disabled="mode === 'update'"
          readonly
          :validation-value="state"
          :rules="getRules('site')"
        />
      </v-col>
      <v-col cols="12" xs="12" sm="4" class="px-2">
        <v-text-field
          v-model="state.year"
          :disabled="mode === 'update'"
          label="year"
          :rules="getRules('year')"
          :validation-value="state"
        />
      </v-col>
      <v-col cols="12" xs="12" sm="4" class="px-2">
        <v-text-field
          v-model="state.number"
          :disabled="mode === 'update'"
          :rules="getRules('number')"
          label="number"
          :validation-value="state"
        />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" xs="12" class="px-2">
        <v-textarea v-model="state.interpretation" label="interpretation" />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" xs="12" class="px-2">
        <v-textarea v-model="state.description" label="description" />
      </v-col>
    </v-row>
  </lazy-data-item-form>
</template>
