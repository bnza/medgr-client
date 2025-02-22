<script setup lang="ts">
import useMediaObjectJoinValidation from '~/composables/validation/useMediaObjectJoinValidation'
import { VForm } from 'vuetify/components'

const props = withDefaults(
  defineProps<{
    parentIri: string
    mimeTypes?: Array<string>
  }>(),
  {
    mimeTypes: () => [
      'application/vnd.oasis.opendocument.spreadsheet',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
    ],
  },
)

const accept = computed(() => props.mimeTypes.join(','))
const state: { item: string; file: File | undefined } = reactive({
  item: props.parentIri,
  file: undefined,
})

const model = defineModel<boolean>({ required: true })
const { submitStatus, createAndFeedback } = injectMediaObjectJoin()

const form = useTemplateRef<VForm>('form')
const getRules = useMediaObjectJoinValidation()
const disabled = computed(() => submitStatus.value === 'pending')

const submit = async () => {
  await form.value?.validate()
  if (!form.value?.isValid) {
    return
  }
  await createAndFeedback(state)
  if (submitStatus.value === 'success') {
    model.value = false
    state.file = undefined
  }
}
watch(model, (flag) => {
  if (!flag) {
    state.file = undefined
  }
})
</script>

<template>
  <v-dialog v-model="model" max-width="600px" persistent>
    <v-card data-testid="create-media-object-card">
      <v-card-text class="text-center">
        <v-container v-if="submitStatus === 'pending'" style="height: 300px">
          <v-row align-content="center" class="fill-height" justify="center">
            <v-col class="text-subtitle-1 text-center" cols="12">
              Request in progress
            </v-col>
            <v-col cols="6">
              <v-progress-linear
                color="warning"
                height="6"
                indeterminate
                rounded
              />
            </v-col>
          </v-row>
        </v-container>
        <v-container v-else style="height: 300px">
          <v-form ref="form" @submit.prevent>
            <v-row align-content="center" class="fill-height" justify="center">
              <v-col class="text-subtitle-1 text-center" cols="12">
                <v-file-input
                  v-model="state.file"
                  :rules="getRules('file')"
                  clearable
                  label="File input"
                  :accept
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-textarea v-model="state.description" label="description" />
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn color="anchor" :disabled @click="model = false"> close </v-btn>
        <v-spacer />
        <v-btn color="primary" :disabled @click="submit()"> submit </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
