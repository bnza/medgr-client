<script setup lang="ts">
import { DataItemPage } from '#components'
import type { ApiAclResource, ApiResourcePottery } from '~~/types'
</script>

<template>
  <component
    :is="DataItemPage<ApiResourcePottery & ApiAclResource>"
    resource-key="pottery"
    mode="create"
  >
    <template #default="{ item, repository, resourceConfig, parent }">
      <lazy-data-item-pottery-form
        :mode="'create'"
        :item
        :parent
        :repository
        :resource-config
      />
    </template>
  </component>
</template>
