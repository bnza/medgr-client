<script setup lang="ts">
import type { ApiId, ApiResourceStratigraphicUnit } from '~~/types'
import { DataItemInfoBox } from '#components'

defineProps<{
  id: ApiId
}>()
</script>

<template>
  <component
    :is="DataItemInfoBox<ApiResourceStratigraphicUnit>"
    :id
    resource-key="stratigraphicUnit"
  >
    <template #activator="{ props }">
      <slot name="activator" v-bind="{ props }" />
    </template>
    <template #default="{ item }">
      <v-container>
        <data-item-info-box-row label="site" :text="item.site.name" />
        <data-item-info-box-row label="year" :text="String(item.year)" />
        <data-item-info-box-row label="number" :text="String(item.number)" />
        <data-item-info-box-row
          label="description"
          :text="item.description ?? ''"
        />
        <data-item-info-box-row
          label="interpretation"
          :text="item.interpretation ?? ''"
        />
      </v-container>
    </template>
  </component>
</template>
