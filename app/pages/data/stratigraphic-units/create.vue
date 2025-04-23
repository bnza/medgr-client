<script setup lang="ts">
import { isResourceCollectionParent } from '~/utils/guards'
</script>

<template>
  <lazy-data-item-page resource-key="stratigraphicUnit" mode="create">
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
  </lazy-data-item-page>
</template>
