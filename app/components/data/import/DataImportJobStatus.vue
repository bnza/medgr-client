<script setup lang="ts">
import type { ApiResourceWorkUnit, JsonLdResourceItem } from '~~/types'
import { statusToColor } from '~/utils/workUnits'
import useWatchJob from '~/composables/useWatchJob'
import type { AsyncComponentOptions } from 'vue'

const job = defineModel<JsonLdResourceItem<ApiResourceWorkUnit>>({
  required: true,
})

const { watchJob, unwatchJob } = useWatchJob(job)

onUnmounted(() => {
  unwatchJob()
})

onDeactivated(() => {
  unwatchJob()
})

onMounted(() => {
  watchJob()
})

onActivated(() => {
  watchJob()
})

const opened = computed(() => {
  const ids: string[] = [job.value.id]

  function traverse(node: ApiResourceWorkUnit) {
    ids.push(node.id)
    if (node.children.length > 0) {
      node.children.forEach(traverse)
    }
  }

  job.value.children.forEach(traverse)
  return ids
})

const color = computed(() => statusToColor(job.value))
const icon = computed(() => statusToIcon(job.value))
const statusText = computed(() => statusToText(job.value))

const emptyComponent: AsyncComponentOptions = {
  loader: () =>
    new Promise((resolve) => {
      resolve({ render: () => h('div', '') })
    }),
}

const dataImportReportComponentsMap: Record<
  StatusText,
  ReturnType<typeof defineAsyncComponent>
> = {
  idle: defineAsyncComponent(emptyComponent),
  running: defineAsyncComponent(emptyComponent),
  error: defineAsyncComponent(
    () => import('~/components/data/import/DataImportErrorReport.vue'),
  ),
  success: defineAsyncComponent(
    () => import('~/components/data/import/DataImportSuccessReport.vue'),
  ),
}

const dataImportReportComponent = computed(
  () => dataImportReportComponentsMap[statusText.value],
)
</script>

<template>
  <v-banner density="compact" :icon :color>
    <p v-for="error in job.errors" :key="error['@id'] as string">
      {{ error.message }}
    </p>
    <p v-if="isSuccess(job)">Successfully imported file.</p>
  </v-banner>
  <v-list :opened>
    <data-import-job-list-item :job />
  </v-list>
  <component
    :is="dataImportReportComponent"
    data-testid="data-import-report"
    :job
  />
</template>

<style scoped></style>
