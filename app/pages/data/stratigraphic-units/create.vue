<script setup lang="ts">
import { DataItemPage } from '#components'
import type { ApiAclResource, ApiResourceStratigraphicUnit } from '~~/types'
</script>

<template>
  <component
    :is="DataItemPage<ApiResourceStratigraphicUnit & ApiAclResource>"
    resource-key="stratigraphicUnit"
    mode="create"
  >
    <template #default="{ item, repository, resourceConfig, parent }">
      <lazy-data-item-stratigraphic-unit-form
        :mode="'create'"
        :item
        :parent
        :repository
        :resource-config
      />
    </template>
  </component>
</template>
