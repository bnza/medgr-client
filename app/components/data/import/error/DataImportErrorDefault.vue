<script setup lang="ts">
import type {
  ApiResourceWorkUnit,
  ApiResourceWorkUnitError,
  JsonLdResourceItem,
} from '~~/types'

defineProps<{
  error: JsonLdResourceItem<ApiResourceWorkUnitError>
  job: JsonLdResourceItem<ApiResourceWorkUnit>
}>()
</script>

<template>
  <v-alert icon="fas fa-circle-exclamation" title="Unexpected error"
    >{{ error.message }}<br />
    <span class="text-secondary"
      >Please contact your system administrator.</span
    >
  </v-alert>
</template>
