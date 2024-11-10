<script setup lang="ts">
import { stratigraphicUnitRelationshipMap } from '~/utils/resources/vocabularies'
import type { ApiResourceItem, JsonLdResourceItem } from '~~/types'
import useStratigraphicUnitRelationshipValidation from '~/composables/validation/useStratigraphicUnitRelationshipValidation'
import type { VForm } from 'vuetify/components'

const { sxSU, creatingRelationshipType, createRelationship, submitStatus } =
  injectStratigraphicUnitsRelationship()

const isDialogOpen = computed({
  get() {
    return Boolean(creatingRelationshipType.value)
  },
  set(_: false) {
    creatingRelationshipType.value = undefined
  },
})

const relationshipText = computed(() =>
  creatingRelationshipType.value
    ? stratigraphicUnitRelationshipMap[creatingRelationshipType.value]
    : '',
)

const dxSU = ref<JsonLdResourceItem<ApiResourceItem> | undefined>(undefined)
const state = computed(() => ({
  sxSU: sxSU.value,
  relationship: creatingRelationshipType.value,
  dxSU: dxSU.value,
}))

const emit = defineEmits<{ refresh: [] }>()
const getRules = useStratigraphicUnitRelationshipValidation({})

const form = useTemplateRef<VForm>('form')
const submitCreate = async () => {
  await form.value?.validate()
  if (form.value?.isValid && dxSU.value) {
    await createRelationship(dxSU.value['@id'])
    if (submitStatus.value === 'success') {
      emit('refresh')
    }
  }
}
</script>

<template>
  <v-dialog
    persistent
    :model-value="isDialogOpen"
    max-width="400px"
    @after-leave="dxSU = undefined"
  >
    <v-card title="new relationship">
      <v-card-text data-testid="add-su-relationship-card">
        <v-container>
          <v-form ref="form" @submit.prevent>
            <v-row dense justify="center">
              <v-col
                justify="center"
                class="text-center text-secondary font-weight-bold"
              >
                <p>{{ sxSU.code }}</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col justify="center" class="text-uppercase text-center">
                <p>{{ relationshipText }}</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col justify="center">
                <api-resource-stratigraphic-unit-autocomplete
                  v-model="dxSU"
                  item-title="code"
                  :rules="getRules('dxSU')"
                  :validation-value="state"
                  :parent="['site', sxSU.site.id]"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn color="anchor" @click="isDialogOpen = false">cancel</v-btn>
        <v-spacer />
        <v-btn color="primary" @click="submitCreate()">submit </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
