<script setup lang="ts">
import { DataItemPage } from '#components'
import type {
  ApiAclResource,
  ApiDataResourceKey,
  ApiResourceSample,
} from '~~/types'
const resourceKey: ApiDataResourceKey = 'sample'

const { tab } = storeToRefs(useUiResourcePageTabStore(resourceKey))

const { hasSitePrivileges, hasRole } = useAppAuth()
</script>

<template>
  <component
    :is="DataItemPage<ApiResourceSample & ApiAclResource>"
    :resource-key
    mode="read"
    code-key="code"
  >
    <template #default="{ item, repository, resourceConfig }">
      <v-tabs v-model="tab" color="anchor">
        <v-tab value="data">data</v-tab>
        <v-tab value="mu">microstratigraphic units</v-tab>
      </v-tabs>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="data" data-testid="tabs-item-data">
          <lazy-data-item-sample-form
            :item
            mode="read"
            :repository
            :resource-config
          />
        </v-tabs-window-item>
        <v-tabs-window-item value="mu" data-testid="tabs-item-mu">
          <lazy-data-collection-card
            resource-key="microStratigraphicUnit"
            :parent="['sample', item]"
            :create-button="hasSitePrivileges(item.stratigraphicUnit?.site)"
          />
        </v-tabs-window-item>
      </v-tabs-window>
    </template>
  </component>
</template>
