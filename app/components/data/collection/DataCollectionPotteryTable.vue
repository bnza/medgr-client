<script setup lang="ts">
import type { ApiDataResourceKey } from '~~/types'

const resourceKey: ApiDataResourceKey = 'pottery'
const { getVocabulary } = useApiVocabulariesStore()

const getFunctionalGroupVocabulary = getVocabulary(
  'vocabularyPotteryFunctionalGroup',
)
const getTypologyVocabulary = getVocabulary('vocabularyPotteryTypology')
const getPartVocabulary = getVocabulary('vocabularyPotteryPart')
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
    <template #[`item.functionalGroup`]="{ item }">
      {{ getFunctionalGroupVocabulary[item.functionalGroup]?.value }}
    </template>
    <template #[`item.typology`]="{ item }">
      {{ getTypologyVocabulary[item.typology]?.value }}
    </template>
    <template #[`item.part`]="{ item }">
      {{ getPartVocabulary[item.part]?.value }}
    </template>
  </lazy-data-collection-table>
</template>
