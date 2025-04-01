<script setup lang="ts">
import type {
  ApiResourceWorkUnit,
  ApiResourceWorkUnitError,
  JsonLdResourceItem,
} from '~~/types'

defineProps<{
  job: JsonLdResourceItem<ApiResourceWorkUnit>
}>()

const errorComponent = (error: ApiResourceWorkUnitError) => {
  const errorsComponents: Record<string, () => Promise<any>> = {
    'App\\Exception\\Import\\FileDataValidationException': () =>
      import(
        '~/components/data/import/error/DataImportErrorFileValidation.vue'
      ),
    'App\\Exception\\Import\\InvalidHeadersException': () =>
      import(
        '~/components/data/import/error/DataImportErrorInvalidHeaders.vue'
      ),
    'App\\Exception\\Import\\InvalidFileTypeException': () =>
      import(
        '~/components/data/import/error/DataImportErrorInvalidFileType.vue'
      ),
  }
  const defaultComponent = () =>
    import('~/components/data/import/error/DataImportErrorDefault.vue')

  const component = errorsComponents[error.class] ?? defaultComponent

  return defineAsyncComponent(component)
}
</script>

<template>
  <v-sheet class="mt-12">
    <component
      :is="errorComponent(error)"
      v-for="error in job.errors"
      :key="error['@id']"
      :job
      :error
    />
  </v-sheet>
</template>
