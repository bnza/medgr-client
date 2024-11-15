<script setup lang="ts">
import type { ApiVocabularyResourceKey } from '~~/types/index.js'

defineProps<{ vocabularyKey: ApiVocabularyResourceKey }>()
const operands = defineModel<Array<string | number>>({
  required: true,
})
const operand = computed({
  get() {
    return operands.value[0]
  },

  set(value: string | number) {
    operands.value = [value]
  },
})
</script>

<template>
  <api-vocabulary-autocomplete
    v-model="operand"
    return-object
    item-value="id"
    :vocabulary-key
    label="value"
    :rules="[required]"
  />
</template>
