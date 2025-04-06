<script setup lang="ts">
import { DataItemPage } from '#components'
import type { ApiAclResource, ApiResourceStratigraphicUnit } from '~~/types'
import { isResourceCollectionParent } from '~/utils/guards'
</script>

<template>
  <component
    :is="DataItemPage<ApiResourceStratigraphicUnit & ApiAclResource>"
    resource-key="stratigraphicUnit"
    mode="create"
  >
    <template #default="{ item, repository, resourceConfig, parent }">
      <lazy-data-item-stratigraphic-unit-form
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
