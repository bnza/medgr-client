<script setup lang="ts">
import type {
  ApiResourceWorkUnit,
  ApiResourceWorkUnitError,
  JsonLdResourceItem,
} from '~~/types'

const props = defineProps<{
  error: JsonLdResourceItem<ApiResourceWorkUnitError>
  job: JsonLdResourceItem<ApiResourceWorkUnit>
}>()

type MissingHeadersValues = {
  missingHeaders: string[]
}
const areErrorValuesMissingHeadersArray = (
  value: unknown,
): value is MissingHeadersValues =>
  isLiteralObject(value) &&
  'missingHeaders' in value &&
  Array.isArray(value.missingHeaders)

const missingHeaders: string[] = areErrorValuesMissingHeadersArray(
  props.error.values,
)
  ? props.error.values.missingHeaders
  : []
</script>

<template>
  <v-alert
    >Your CSV file has an invalid data structure. Please double check
    it</v-alert
  >
  <v-list dense>
    <v-list-subheader>MISSING HEADERS</v-list-subheader>
    <v-list-item v-for="value in missingHeaders" :key="value" :title="value" />
  </v-list>
</template>
