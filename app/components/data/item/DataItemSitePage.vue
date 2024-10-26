<script setup lang="ts">
import type {
  ApiAclResource,
  ApiDataResourceKey,
  ApiResourceSite,
} from '~~/types'
import { DataItemPage } from '#components'

const resourceKey: ApiDataResourceKey = 'site'
const { tab } = storeToRefs(useUiResourcePageTabStore(resourceKey))

const { hasSitePrivileges } = useAppAuth()
</script>

<template>
  <component
    :is="DataItemPage<ApiResourceSite & ApiAclResource>"
    :resource-key
    mode="read"
    code-key="code"
  >
    <template #default="{ item, repository, resourceConfig }">
      <v-tabs
        v-model="tab"
        color="anchor"
        :bg-color="DATA_API_ACTIONS_BAR_COLOR['read']"
      >
        <v-tab value="data">data</v-tab>
        <v-tab value="sus">stratigraphic units</v-tab>
      </v-tabs>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="data" data-testid="tabs-item-data">
          <lazy-data-item-site-form
            :item
            mode="read"
            :repository
            :resource-config
          />
        </v-tabs-window-item>
        <v-tabs-window-item value="sus" data-testid="tabs-item-sus">
          <lazy-data-collection-card
            resource-key="stratigraphicUnit"
            :parent="['site', item]"
            :create-button="hasSitePrivileges(item)"
          />
        </v-tabs-window-item>
      </v-tabs-window>
    </template>
  </component>
</template>
