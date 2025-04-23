<script setup lang="ts">
import { isResourceCollectionParent } from '~/utils/guards'
</script>

<template>
  <lazy-data-item-page resource-key="microStratigraphicUnit" mode="create">
    <template #default="{ item, repository, resourceConfig, parent }">
      <lazy-data-item-micro-stratigraphic-unit-form
        v-if="isResourceCollectionParent(parent)"
        mode="create"
        :item
        :parent
        :repository
        :resource-config
      />
    </template>
  </lazy-data-item-page>
</template>
