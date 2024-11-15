<script setup lang="ts">
import { DataItemPage } from '#components'
import type { ApiAclResource, ApiResourcePottery } from '~~/types'
</script>

<template>
  <component
    :is="DataItemPage<ApiResourcePottery & ApiAclResource>"
    mode="update"
    resource-key="pottery"
    code-key="code"
  >
    <template #default="{ item, repository, resourceConfig }">
      <lazy-data-item-pottery-form
        mode="update"
        :item
        :repository
        :resource-config
      />
    </template>
  </component>
</template>
