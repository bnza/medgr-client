<script setup lang="ts">
import type { ApiVocabularyResourceKey } from '~~/types'

const props = withDefaults(
  defineProps<{
    itemValue?: string
    returnObject?: boolean
    vocabularyKey: ApiVocabularyResourceKey
  }>(),
  {
    itemValue: '@id',
    returnObject: false,
  },
)
const { getVocabulary } = useApiVocabulariesStore()
console.log(getVocabulary(props.vocabularyKey))
const vocabularies = Object.values(getVocabulary(props.vocabularyKey))
</script>

<template>
  <v-autocomplete
    :items="vocabularies"
    :item-value
    :return-object
    item-title="value"
  />
</template>
