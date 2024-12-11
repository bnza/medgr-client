<script setup lang="ts">
import type { ApiDataResourceKey } from '~~/types'

const resourceKey: ApiDataResourceKey = 'microStratigraphicUnit'
</script>

<template>
  <lazy-data-collection-table :resource-key :multi-sort="true">
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
    <template #[`item.lenticularPlateyPeds`]="{ item }">
      <v-checkbox-btn
        density="compact"
        :inline="true"
        readonly
        :model-value="item.lenticularPlateyPeds"
      />
    </template>
    <template #[`item.crumbsOrGranules`]="{ item }">
      <v-checkbox-btn
        density="compact"
        inline
        readonly
        :model-value="item.crumbsOrGranules"
      />
    </template>
    <template #[`item.saBlockyPeds`]="{ item }">
      <v-checkbox-btn
        density="compact"
        inline
        readonly
        :model-value="item.saBlockyPeds"
      />
    </template>
    <template #[`item.cracks`]="{ item }">
      <v-checkbox-btn
        density="compact"
        inline
        readonly
        :model-value="item.cracks"
      />
    </template>
    <template #[`item.infillings`]="{ item }">
      <v-checkbox-btn
        density="compact"
        inline
        readonly
        :model-value="item.infillings"
      />
    </template>
    <template #[`item.mesofaunaRootBioturbation`]="{ item }">
      <v-rating
        readonly
        :model-value="item.mesofaunaRootBioturbation"
        density="comfortable"
      >
        <template #item="{ isFilled }">
          <v-icon :color="isFilled ? 'primary' : 'grey-lighten-1'" :size="8">
            {{ isFilled ? 'fas fa-circle' : 'far fa-circle' }}
          </v-icon>
        </template>
      </v-rating>
    </template>
    <template #[`item.earthwormInternalChamber`]="{ item }">
      <v-rating
        readonly
        :model-value="item.earthwormInternalChamber"
        density="comfortable"
      >
        <template #item="{ isFilled }">
          <v-icon :color="isFilled ? 'primary' : 'grey-lighten-1'" :size="8">
            {{ isFilled ? 'fas fa-circle' : 'far fa-circle' }}
          </v-icon>
        </template>
      </v-rating>
    </template>
    <template #[`item.organicOrganoMineral`]="{ item }">
      <v-rating
        readonly
        :model-value="item.organicOrganoMineral"
        density="comfortable"
      >
        <template #item="{ isFilled }">
          <v-icon :color="isFilled ? 'primary' : 'grey-lighten-1'" :size="8">
            {{ isFilled ? 'fas fa-circle' : 'far fa-circle' }}
          </v-icon>
        </template>
      </v-rating>
    </template>
    <template #[`item.earthwormGranule`]="{ item }">
      <v-rating
        readonly
        :model-value="item.earthwormGranule"
        density="comfortable"
      >
        <template #item="{ isFilled }">
          <v-icon :color="isFilled ? 'primary' : 'grey-lighten-1'" :size="8">
            {{ isFilled ? 'fas fa-circle' : 'far fa-circle' }}
          </v-icon>
        </template>
      </v-rating>
    </template>
  </lazy-data-collection-table>
</template>
