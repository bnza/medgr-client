<script setup lang="ts">
import type {
  ApiResourceImportFile,
  ApiResourceWorkUnit,
  ApiResourceWorkUnitError,
  JsonLdResourceItem,
} from '~~/types'

const props = defineProps<{
  error: JsonLdResourceItem<ApiResourceWorkUnitError>
  job: JsonLdResourceItem<ApiResourceWorkUnit>
}>()

const repository =
  useNuxtApp().$api.getRepository<ApiResourceImportFile>('importFile')

const errorFile = await repository.fetchItem(props.job.id)
const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl
const href = computed(() =>
  errorFile.contentUrl ? apiBaseUrl + errorFile.contentUrl : '',
)
</script>

<template>
  <v-alert>
    <v-alert-title>{{ error.message }}</v-alert-title>
    <p v-if="errorFile">
      Detailed data verification report can be downloaded
      <a
        :href
        download
        target="_blank"
        data-testid="verification-failure-report-link"
        >here</a
      >
    </p>
  </v-alert>
</template>

<style scoped></style>
