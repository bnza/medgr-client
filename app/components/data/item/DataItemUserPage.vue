<script setup lang="ts">
import type { ApiDataResourceKey } from '~~/types'

const { isCurrentUser } = useAppAuth()
const resourceKey: ApiDataResourceKey = 'user'
const { tab } = storeToRefs(useUiResourcePageTabStore(resourceKey))
</script>

<template>
  <lazy-data-item-page :resource-key mode="read" code-key="email">
    <template #toolbar-append="{ item }">
      <user-password-dialog-open-button
        size="small"
        mode="reset"
        :disabled="isCurrentUser(item.email)"
      />
    </template>
    <template #default="{ item, repository, resourceConfig }">
      <user-password-dialog :item :mode="'reset'" />
      <v-tabs
        v-model="tab"
        color="anchor"
        :bg-color="DATA_API_ACTIONS_BAR_COLOR['read']"
      >
        <v-tab value="data">data</v-tab>
        <v-tab value="sus">sites privileges</v-tab>
      </v-tabs>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="data" data-testid="tabs-item-data">
          <lazy-data-item-user-form
            :item
            mode="read"
            :repository
            :resource-config
          />
        </v-tabs-window-item>
        <v-tabs-window-item value="sus" data-testid="tabs-item-sus">
          <lazy-data-collection-card
            resource-key="sitesUser"
            :parent="['user', item]"
            create-button
          />
        </v-tabs-window-item>
      </v-tabs-window>
    </template>
  </lazy-data-item-page>
</template>
