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
const disabled = computed(() => {
  if (typeof job.value === 'undefined') {
    return false
  }
  return isRunning(job.value)
})
</script>

<template>
  <data-card title="Import CSV file">
    <template #toolbar-prepend>
      <navigation-resource-collection-back :disabled />
    </template>
    <v-sheet class="mx-12">
      <lazy-data-import-file-form v-if="!job" v-model="job" v-bind="$props" />
      <lazy-data-import-job-status v-else v-model="job" />
    </v-sheet>
  </data-card>
</template>
