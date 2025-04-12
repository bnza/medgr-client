<script setup lang="ts">
import type { ApiResourceItem, JsonLdResourceItem } from '~~/types'

withDefaults(
  defineProps<{
    item: JsonLdResourceItem<ApiResourceItem>
    codeKey?: string
  }>(),
  {
    codeKey: 'code',
  },
)
</script>

<template>
  <v-chip class="text-white" data-testid="info-box-chip">
    {{ codeKey in item ? item[codeKey] : item['@id'] }}
  </v-chip>
</template>
