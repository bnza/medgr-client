<script setup lang="ts">
import type { ApiDataResourceKey } from '~~/types'

const resourceKey: ApiDataResourceKey = 'sample'

const { parse } = useAppDate()
</script>

<template>
  <lazy-data-collection-table :resource-key>
    <template #[`item.id`]="{ item, resourceConfig }">
      <navigation-resource-item
        :id="item.id"
        :acl="item._acl"
        :app-path="resourceConfig.appPath"
      />
    </template>
    <template #[`item.code`]="{ item }">
      <p class="text-secondary">{{ item.code }}</p>
    </template>
    <template #[`item.stratigraphicUnits`]="{ item }">
      <v-container class="ma-0 pa-0">
        <v-row
          v-for="su in item.stratigraphicUnits"
          :key="su.id"
          class="ma-0 pa-2 justify-center"
        >
          <v-col cols="12" class="ma-0 pa-0 justify-center">
            <lazy-data-item-info-box-stratigraphic-unit
              :id="su.stratigraphicUnit.id"
            >
              <template #activator="{ props }">
                <lazy-data-item-info-box-chip
                  v-bind="props"
                  :item="su.stratigraphicUnit"
                />
              </template>
            </lazy-data-item-info-box-stratigraphic-unit>
          </v-col>
        </v-row>
      </v-container>
    </template>
    <template #[`item.takingDate`]="{ item }">
      <p>{{ parse(item.takingDate)?.toLocaleDateString() }}</p>
    </template>
  </lazy-data-collection-table>
</template>
