<script setup lang="ts">
import type { ApiResourceWorkUnit, JsonLdResourceItem } from '~~/types'
import { statusToColor } from '~/utils/workUnits'
import useWatchJob from '~/composables/useWatchJob'

const props = defineProps<{
  job: JsonLdResourceItem<ApiResourceWorkUnit>
}>()

const job = toRef(props.job)

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
</script>

<template>
  <v-list :opened>
    <data-import-job-list-item :job />
  </v-list>
  <v-alert density="compact" :icon :color>
    Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi.
    Vivamus quis mi. Quisque ut nisi. Maecenas malesuada.
  </v-alert>
</template>

<style scoped></style>
