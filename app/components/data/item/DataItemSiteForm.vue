<script setup lang="ts">
import type { ApiAction, ApiResourceSite, ResourceConfig } from '~~/types'
import useSiteValidation from '~/composables/validation/useSiteValidation'
import useResourceItemForm from '~/composables/useResourceItemForm'
import type ResourceRepository from '~/utils/repository/ResourceRepository'
import useResourceItemNormalizeSubmit from '~/composables/useResourceItemNormalizeSubmit'

const props = defineProps<{
  mode: ApiAction
  item: ApiResourceSite
  repository: ResourceRepository<ApiResourceSite>
  resourceConfig: ResourceConfig
}>()

const { isAuthenticated, readonly, state } =
  useResourceItemForm<ApiResourceSite>(props.mode, props.item)

const getRules = readonly.value
  ? (_: string) => undefined
  : useSiteValidation(props.item)

useResourceItemNormalizeSubmit(props.mode, props.item, state)

const panel = ref(['identification', 'description'])
</script>

<template>
  <lazy-data-item-form :item :mode :readonly :repository :resource-config>
    <v-expansion-panels v-model="panel" variant="accordion" multiple flat>
      <data-expansion-panel value="identification" title="identification">
        <v-row v-if="isAuthenticated" no-gutters justify="end">
          <v-col cols="12" sm="3" class="px-2">
            <v-checkbox v-model="state.public" label="public" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" xs="6" sm="2" class="px-2">
            <v-text-field
              v-model="state.code"
              :disabled="mode === 'update'"
              class="text-input-secondary"
              :rules="getRules('code')"
              label="code"
            />
          </v-col>
          <v-col cols="12" xs="12" sm="10" class="px-2">
            <v-text-field
              v-model="state.name"
              :validation-value="state.name"
              :rules="getRules('name')"
              label="name"
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
      </data-expansion-panel>
    </v-expansion-panels>
  </lazy-data-item-form>
</template>
