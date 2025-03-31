<script setup lang="ts">
import type {
  ApiResourceWorkUnit,
  ApiResourceWorkUnitError,
  JsonLdResourceItem,
} from '~~/types'

defineProps<{
  job: JsonLdResourceItem<ApiResourceWorkUnit>
}>()

const errorComponent = (
  error: JsonLdResourceItem<ApiResourceWorkUnitError>,
) => {
  const errorsComponents: Record<string, () => Promise<any>> = {
    'App\\Exception\\Import\\FileDataValidationException': () =>
      import(
        '~/components/data/import/error/DataImportErrorFileValidation.vue'
      ),
  }
  const defaultComponent = () =>
    import('~/components/data/import/error/DataImportErrorDefault.vue')

  const component = errorsComponents[error.class] ?? defaultComponent

  return defineAsyncComponent(component)
}
</script>

<template>
  <v-sheet>
    <component
      :is="errorComponent(error)"
      v-for="error in job.errors"
      :key="error['@id']"
      :job
      :error
    />
  </v-sheet>
</template>
