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
  <p>{{ error.message }}</p>
  <p v-if="errorFile">
    Detailed data verification report can be downloaded
    <a :href download target="_blank">here</a>
  </p>
</template>

<style scoped></style>
