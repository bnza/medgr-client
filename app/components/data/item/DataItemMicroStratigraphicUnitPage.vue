<script setup lang="ts">
import type { ApiDataResourceKey } from '~~/types'

const resourceKey: ApiDataResourceKey = 'microStratigraphicUnit'
const { tab } = storeToRefs(useUiResourcePageTabStore(resourceKey))
</script>

<template>
  <lazy-data-item-page :resource-key mode="read" code-key="code">
    <template #default="{ item, repository, resourceConfig }">
      <v-tabs v-model="tab" color="anchor">
        <v-tab value="data">data</v-tab>
        <v-tab value="media">media</v-tab>
      </v-tabs>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="data" data-testid="tabs-item-data">
          <lazy-data-item-micro-stratigraphic-unit-form
            :item
            mode="read"
            :repository
            :resource-config
          />
        </v-tabs-window-item>
        <v-tabs-window-item value="media">
          <p>media</p>
        </v-tabs-window-item>
      </v-tabs-window>
    </template>
  </lazy-data-item-page>
</template>
