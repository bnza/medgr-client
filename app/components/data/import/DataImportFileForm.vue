<script setup lang="ts">
import { VForm } from 'vuetify/components'
import useImportFileValidation from '~/composables/validation/useImportFileValidation'
import type {
  ApiResourceWorkUnit,
  ImportableDataResourceKey,
  JsonLdResourceItem,
} from '~~/types'

const props = defineProps<{
  resourceType: ImportableDataResourceKey
  mimeTypes: Array<string>
}>()
const form = useTemplateRef<VForm>('form')
const getRules = useImportFileValidation()

const accept = computed(() => props.mimeTypes.join(','))
const { submitStatus, importFile } = useImportCsvFile(props.resourceType)
const disabled = computed(() => submitStatus.value === 'pending')

const state = reactive<{ file?: File; description?: string }>({
  file: undefined,
  description: undefined,
})

const job = defineModel<JsonLdResourceItem<ApiResourceWorkUnit> | undefined>({
  required: true,
})

const submit = async () => {
  await form.value?.validate()

  if (!form.value?.isValid) {
    return
  }

  if (state.file instanceof File) {
    job.value = await importFile(state)
  }
}
</script>

<template>
  <v-container v-if="submitStatus === 'pending'" style="height: 300px">
    <v-row align-content="center" class="fill-height" justify="center">
      <v-col class="text-subtitle-1 text-center" cols="12">
        Request in progress
      </v-col>
      <v-col cols="6">
        <v-progress-linear color="warning" height="6" indeterminate rounded />
      </v-col>
    </v-row>
  </v-container>
  <v-container
    v-else-if="submitStatus === 'idle'"
    style="height: 300px"
    class="mx-12"
  >
    <v-row justify="center" data-testid="import-file-alert-row">
      <v-col cols="12" sm="12" lg="6">
        <v-alert
          class="my-4"
          variant="outlined"
          text="Be careful when import file to the database. This action cannot be undone."
          title="Import file"
          type="warning"
          icon="fas fa-exclamation-triangle"
        />
      </v-col>
    </v-row>
    <v-row align-content="center" justify="center">
      <v-col cols="10">
        <v-form
          :ref="'form'"
          class="mt-12"
          data-testid="import-file-form"
          @submit.prevent
        >
          <v-file-input
            v-model="state.file"
            :rules="getRules('file')"
            clearable
            label="file"
            :accept
          />
          <v-textarea v-model="state.description" label="description" />
        </v-form>
      </v-col>
    </v-row>
    <v-row justify="space-around">
      <v-col cols="1">
        <v-btn color="anchor" :disabled @click="$router.back()"> close </v-btn>
      </v-col>
      <v-col cols="1" justify="center">
        <v-btn color="primary" :disabled @click="submit()"> submit </v-btn>
      </v-col>
    </v-row>
  </v-container>
  <v-banner
    v-else-if="submitStatus === 'error'"
    color="error"
    icon="fas fa-circle-xmark"
  >
    File upload or job run failed. Please contact the system administrator.
  </v-banner>
</template>
