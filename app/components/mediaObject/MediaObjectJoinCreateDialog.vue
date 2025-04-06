<script setup lang="ts">
import useMediaObjectJoinValidation from '~/composables/validation/useMediaObjectJoinValidation'
import { VForm } from 'vuetify/components'
import type { ApiResourceItem, OptionalProp } from '~~/types'

type MediaObjectState = {
  item: string
  file: File
  description?: string
}

type PartialMediaObjectState = OptionalProp<MediaObjectState, 'file'>

const isMediaObjectState = (
  state: PartialMediaObjectState,
): state is MediaObjectState => Boolean(state.file)

const props = withDefaults(
  defineProps<{
    parent: ApiResourceItem
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

const parentIri = computed<string>(() => {
  if (isApiLdResourceItem(props.parent)) {
    return props.parent['@id']
  }
  return ''
})

const accept = computed(() => props.mimeTypes.join(','))
const state: PartialMediaObjectState = reactive({
  item: parentIri.value,
  file: undefined,
  description: undefined,
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

  if (isMediaObjectState(state)) {
    await createAndFeedback(state)
  }

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
        <v-container v-if="!parentIri" style="height: 300px">
          <v-alert
            icon="fas fa-exclamation-mark"
            title="Invalid value"
            text="Expecting Json Ld Item. Missing '@id' property"
          />
        </v-container>
        <v-container
          v-else-if="submitStatus === 'pending'"
          style="height: 300px"
        >
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
          <v-form :ref="'form'" @submit.prevent>
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
