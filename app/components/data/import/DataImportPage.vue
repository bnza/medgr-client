<script setup lang="ts">
import type {
  ApiResourceWorkUnit,
  ImportableDataResourceKey,
  JsonLdResourceItem,
} from '~~/types'

defineProps<{
  resourceType: ImportableDataResourceKey
  mimeTypes: Array<string>
}>()
const job = ref<JsonLdResourceItem<ApiResourceWorkUnit> | undefined>()
</script>

<template>
  <data-card title="Import CSV file">
    <v-sheet class="mx-12">
      <lazy-data-import-file-form v-if="!job" v-model="job" v-bind="$props" />
      <lazy-data-import-job-status v-else v-model="job" />
    </v-sheet>
  </data-card>
</template>
