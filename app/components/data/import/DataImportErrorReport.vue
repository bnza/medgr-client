<script setup lang="ts">
import type { ApiResourceWorkUnit, JsonLdResourceItem } from '~~/types'

const props = defineProps<{
  job: JsonLdResourceItem<ApiResourceWorkUnit>
}>()
</script>

<template>
  <v-sheet>
    <p>error</p>
  </v-sheet>
</template>
