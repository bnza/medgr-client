<script setup lang="ts">
import { DataItemPage } from '#components'
import type {
  ApiAclResource,
  ApiDataResourceKey,
  ApiResourceSitesUser,
} from '~~/types'
const resourceKey: ApiDataResourceKey = 'sitesUser'
</script>

<template>
  <component
    :is="DataItemPage<ApiResourceSitesUser & ApiAclResource>"
    :resource-key
    mode="read"
    code-key="id"
  >
    <template #default="{ item, repository, resourceConfig }">
      <lazy-data-item-sites-user-form
        v-if="item"
        :item="item"
        :repository
        :resource-config
        mode="read"
      />
    </template>
  </component>
</template>
