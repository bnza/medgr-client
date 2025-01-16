<script setup lang="ts">
import type {
  ApiAclResource,
  ApiDataResourceKey,
  ApiResourceStratigraphicUnit,
} from '~~/types'
import { DataItemPage } from '#components'

const resourceKey: ApiDataResourceKey = 'stratigraphicUnit'
const { tab } = storeToRefs(useUiResourcePageTabStore(resourceKey))
// const {isAuthenticated} = useAppAuth()
</script>

<template>
  <component
    :is="DataItemPage<ApiResourceStratigraphicUnit & ApiAclResource>"
    :resource-key
    mode="read"
    code-key="code"
  >
    <template #default="{ item, repository, resourceConfig }">
      <v-tabs v-model="tab" color="anchor">
        <v-tab value="data">data</v-tab>
        <v-tab value="relationships">relationships</v-tab>
        <v-tab value="potteries">potteries</v-tab>
        <v-tab value="samples">samples</v-tab>
        <v-tab value="media">media</v-tab>
      </v-tabs>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="data">
          <lazy-data-item-stratigraphic-unit-form
            :item
            mode="read"
            :repository
            :resource-config
          />
        </v-tabs-window-item>
        <v-tabs-window-item value="relationships">
          <sus-relationship-container :sx-su="item" />
        </v-tabs-window-item>
        <v-tabs-window-item value="potteries">
          <lazy-data-collection-card
            resource-key="pottery"
            :parent="['stratigraphicUnit', item]"
            :create-button="item._acl.canUpdate"
          />
        </v-tabs-window-item>
        <v-tabs-window-item value="samples">
          <lazy-data-collection-card
            resource-key="sample"
            :parent="['stratigraphicUnits.stratigraphicUnit', item]"
            :create-button="item._acl.canUpdate"
          />
        </v-tabs-window-item>
        <v-tabs-window-item value="media">
          <lazy-media-object-join-container
            resource-key="stratigraphicUnitsMediaObject"
            :parent="['item', item]"
            :can-update="item._acl.canUpdate"
          />
        </v-tabs-window-item>
      </v-tabs-window>
    </template>
  </component>
</template>
