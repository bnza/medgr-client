<script setup lang="ts">
import { DataItemPage } from '#components'
import type {
  ApiAclResource,
  ApiResourceMicroStratigraphicUnit,
} from '~~/types'
</script>

<template>
  <component
    :is="DataItemPage<ApiResourceMicroStratigraphicUnit & ApiAclResource>"
    resource-key="microStratigraphicUnit"
    mode="create"
  >
    <template #default="{ item, repository, resourceConfig, parent }">
      <lazy-data-item-micro-stratigraphic-unit-form
        mode="create"
        :item
        :parent
        :repository
        :resource-config
      />
    </template>
  </component>
</template>
