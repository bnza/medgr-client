<script setup lang="ts">
import type { ApiResourceSite } from '~~/types/index.js'
</script>

<template>
  <api-resource-autocomplete
    label="site"
    path="sites"
    :item-props="
      (value: Pick<ApiResourceSite, 'id' | 'code' | 'name'>) => ({
        value: value.id,
        title: value.code,
        subtitle: value.name,
      })
    "
  >
    <template #selection="{ props, item }">
      <v-list-item v-bind="props">
        <template #title
          ><span class="text-secondary font-weight-bold">{{
            item.raw.code
          }}</span>
          - <span>{{ item.raw.name }}</span></template
        >
      </v-list-item>
    </template>
    <template v-if="'readonly' in $attrs" #append-inner="{ selectedItem }">
      <lazy-data-item-info-box-site v-if="selectedItem" :id="selectedItem.id" />
    </template>
  </api-resource-autocomplete>
</template>
