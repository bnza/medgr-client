<script setup lang="ts">
import { DataItemPage } from '#components'
import type { ApiAclResource, ApiResourcePottery } from '~~/types'
import { isResourceCollectionParent } from '~/utils/guards'
</script>

<template>
  <component
    :is="DataItemPage<ApiResourcePottery & ApiAclResource>"
    resource-key="pottery"
    mode="create"
  >
    <template #default="{ item, repository, resourceConfig, parent }">
      <lazy-data-item-pottery-form
        v-if="isResourceCollectionParent(parent)"
        :mode="'create'"
        :item
        :parent
        :repository
        :resource-config
      />
    </template>
  </component>
</template>
