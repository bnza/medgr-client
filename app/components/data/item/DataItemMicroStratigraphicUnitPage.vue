<script setup lang="ts">
import type {
  ApiAclResource,
  ApiDataResourceKey,
  ApiResourceMicroStratigraphicUnit,
} from '~~/types'
import { DataItemPage } from '#components'

const resourceKey: ApiDataResourceKey = 'microStratigraphicUnit'
const { tab } = storeToRefs(useUiResourcePageTabStore(resourceKey))
</script>

<template>
  <component
    :is="DataItemPage<ApiResourceMicroStratigraphicUnit & ApiAclResource>"
    :resource-key
    mode="read"
    code-key="code"
  >
    <template #default="{ item, repository, resourceConfig }">
      <v-tabs v-model="tab" color="anchor">
        <v-tab value="data">data</v-tab>
        <v-tab value="data">sample</v-tab>
        <v-tab value="media">media</v-tab>
      </v-tabs>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="data">
          <lazy-data-item-micro-stratigraphic-unit-form
            :item
            mode="read"
            :repository
            :resource-config
          />
        </v-tabs-window-item>
        <v-tabs-window-item value="sample">
          <p>sample</p>
        </v-tabs-window-item>
        <v-tabs-window-item value="media">
          <p>media</p>
        </v-tabs-window-item>
      </v-tabs-window>
    </template>
  </component>
</template>
