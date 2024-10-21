<script setup lang="ts">
import type { Filter } from '~~/types'
import type { VForm } from 'vuetify/components'

defineProps<{ filter?: Filter }>()
const model = defineModel<boolean>({ required: true })

const form = useTemplateRef<VForm>('form')
</script>

<template>
  <v-dialog v-model="model" data-testid="edit-filter-dialog">
    <v-card class="pa-8">
      <v-card-title data-testid="edit-filter-dialog-title">
        {{ !!filter ? 'Edit' : 'Add' }} filter
      </v-card-title>
      <v-card-text class="h-75" data-testid="filter-edit-content">
        <lazy-search-add-filter-form ref="form" />
      </v-card-text>
      <v-card-actions>
        <v-btn
          class="mr-8"
          data-testid="close-button"
          color="anchor"
          @click="model = false"
        >
          Close
        </v-btn>
        <v-spacer />
        <v-btn
          class="ml-8"
          data-testid="close-button"
          color="primary"
          @click="form.submit()"
        >
          Add
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
