<script setup lang="ts">
import type {
  ApiAclResource,
  ApiDataResourceKey,
  ApiResourceSite,
} from '~~/types'
import useUiResourcePageTabStore from '~/stores/useUiResourcePageTabStore'
import { DataItemPage } from '#components'

const apiResourceKey: ApiDataResourceKey = 'site'
const { tab } = storeToRefs(useUiResourcePageTabStore(apiResourceKey))
</script>

<template>
  <component
    :is="DataItemPage<ApiResourceSite & ApiAclResource>"
    resource-key="site"
    mode="read"
    code-key="code"
  >
    <template #default="{ item, repository, resourceConfig }">
      <v-tabs v-model="tab" color="anchor">
        <v-tab value="data">data</v-tab>
        <v-tab value="sus">stratigraphic units</v-tab>
      </v-tabs>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="data">
          <lazy-data-item-site-form
            :item
            mode="read"
            :repository
            :resource-config
          />
        </v-tabs-window-item>
        <v-tabs-window-item value="sus">
          <p>sus</p>
        </v-tabs-window-item>
      </v-tabs-window>
    </template>
  </component>
</template>
