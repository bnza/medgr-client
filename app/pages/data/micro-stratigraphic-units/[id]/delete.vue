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
    mode="delete"
    resource-key="microStratigraphicUnit"
    code-key="code"
  >
    <template #default="{ item, repository, resourceConfig }">
      <lazy-data-item-micro-stratigraphic-unit-form
        mode="delete"
        :item
        :repository
        :resource-config
      />
    </template>
  </component>
</template>
