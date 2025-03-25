<script setup lang="ts">
import type { ApiResourceWorkUnit, JsonLdResourceItem } from '~~/types'

const props = defineProps<{
  job: JsonLdResourceItem<ApiResourceWorkUnit>
}>()

const color = computed(() => {
  if (isSuccess(props.job)) {
    return 'success'
  } else if (isError(props.job)) {
    return 'error'
  } else if (isRunning(props.job)) {
    return 'warning'
  }
  return null
})

const duration = computed(() => {
  if (props.job.terminatedAt && props.job.startedAt) {
    return (props.job.terminatedAt - props.job.startedAt).toFixed(3)
  }
  return null
})

const icon = computed(() => {
  if (isSuccess(props.job)) {
    return 'fas fa-circle-check'
  } else if (isError(props.job)) {
    return 'fas fa-circle-exclamation'
  } else if (isRunning(props.job)) {
    return 'fas fa-circle-xmark'
  }
  return 'fas fa-circle'
})

const { watchCachedJob, unwatchCachedJob, currentStepNumber } = useWatchJob(
  toRef(props.job),
)

watch(
  () => props.job.status,
  (status) => {
    if (isTerminated(status)) {
      unwatchCachedJob()
    }
    watchCachedJob()
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <v-list-item>
    <v-list-item-title>{{ job.description }}</v-list-item-title>
    <v-list-item-subtitle class="mb-1 text-high-emphasis opacity-60">{{
      job.service
    }}</v-list-item-subtitle>
    <v-row align="center" dense>
      <v-col cols="11">
        <v-progress-linear
          :max="job.stepsCount || 0"
          :model-value="currentStepNumber"
          :color
        />
      </v-col>
      <v-col cols="1" class="text-center">
        {{ currentStepNumber }} / {{ job.stepsCount }}
      </v-col>
    </v-row>
    <template #append>
      <v-list-item-action class="flex-column align-end">
        <small class="mb-4 text-high-emphasis opacity-60"
          >{{ duration }} sec</small
        >
        <v-icon :color :icon />
      </v-list-item-action>
    </template>
  </v-list-item>
  <v-list-group :value="job.id">
    <data-import-job-list-item
      v-for="child of job.children"
      :key="child.id"
      :job="child"
    />
  </v-list-group>
</template>
