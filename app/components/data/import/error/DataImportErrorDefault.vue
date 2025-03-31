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
  <p>{{ error.message }}</p>
</template>
