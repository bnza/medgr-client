<script setup lang="ts">
import { DataItemPage } from '#components'
import type {
  ApiAclResource,
  ApiDataResourceKey,
  ApiResourcePottery,
} from '~~/types'
const resourceKey: ApiDataResourceKey = 'pottery'

const { tab } = storeToRefs(useUiResourcePageTabStore(resourceKey))
</script>

<template>
  <component
    :is="DataItemPage<ApiResourcePottery & ApiAclResource>"
    :resource-key
    mode="read"
    code-key="code"
  >
    <template #default="{ item, repository, resourceConfig }">
      <v-tabs v-model="tab" color="anchor">
        <v-tab value="data">data</v-tab>
        <v-tab value="media">media</v-tab>
      </v-tabs>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="data">
          <lazy-data-item-pottery-form
            :item
            mode="read"
            :repository
            :resource-config
          />
        </v-tabs-window-item>
        <v-tabs-window-item value="media">
          <lazy-media-object-join-container
            resource-key="potteriesMediaObject"
            :parent="['item', item]"
            :can-update="item._acl.canUpdate"
          />
        </v-tabs-window-item>
      </v-tabs-window>
    </template>
  </component>
</template>
