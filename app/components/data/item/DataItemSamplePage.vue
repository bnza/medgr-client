<script setup lang="ts">
import type { ApiDataResourceKey } from '~~/types'
const resourceKey: ApiDataResourceKey = 'sample'

const { tab } = storeToRefs(useUiResourcePageTabStore(resourceKey))

const { hasSitePrivileges } = useAppAuth()
</script>

<template>
  <lazy-data-item-page :resource-key mode="read" code-key="code">
    <template #default="{ item, repository, resourceConfig }">
      <v-tabs v-model="tab" color="anchor">
        <v-tab value="data">data</v-tab>
        <v-tab value="mu">microstratigraphic units</v-tab>
        <v-tab value="media">media</v-tab>
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
        <v-tabs-window-item value="media">
          <lazy-media-object-join-container
            resource-key="samplesMediaObject"
            :parent="['item', item]"
            :can-update="item._acl.canUpdate"
          />
        </v-tabs-window-item>
      </v-tabs-window>
    </template>
  </lazy-data-item-page>
</template>
