<script setup lang="ts">
import { DataItemPage } from '#components'
import type { ApiAclResource, ApiResourceStratigraphicUnit } from '~~/types'
</script>

<template>
  <component
    :is="DataItemPage<ApiResourceStratigraphicUnit & ApiAclResource>"
    mode="delete"
    resource-key="stratigraphicUnit"
    code-key="code"
  >
    <template #default="{ item, repository, resourceConfig }">
      <lazy-data-item-stratigraphic-unit-form
        mode="delete"
        :item
        :repository
        :resource-config
      />
    </template>
  </component>
</template>
