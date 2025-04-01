<script setup lang="ts">
import type { ApiResourceImportedFile, ResourceConfig } from '~~/types'
import useResourceItemForm from '~/composables/useResourceItemForm'
import type ResourceRepository from '~/utils/repository/ResourceRepository'

const props = defineProps<{
  item: ApiResourceImportedFile
  repository: ResourceRepository<ApiResourceImportedFile>
  resourceConfig: ResourceConfig
}>()

const { state } = useResourceItemForm<ApiResourceImportedFile>(
  'create',
  props.item,
)

const panel = ref(['identification', 'file'])

const { parseIso } = useAppDate()
</script>

<template>
  <lazy-data-item-read-only-form :item :repository :resource-config>
    <v-expansion-panels v-model="panel" variant="accordion" multiple flat>
      <data-expansion-panel value="identification" title="identification">
        <v-row>
          <v-col cols="12" xs="6" sm="3" class="px-2">
            <v-text-field
              v-model="state.userId"
              class="text-input-secondary"
              label="user"
            />
          </v-col>
          <v-col cols="12" xs="12" sm="3" class="px-2">
            <v-text-field v-model="state.service" label="service" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-textarea
              :model-value="state.mediaObject.description"
              label="description"
              rows="2"
            />
          </v-col>
        </v-row>
      </data-expansion-panel>
      <data-expansion-panel value="file" title="file">
        <v-row>
          <v-col cols="12" xs="6" sm="3" class="px-2">
            <v-text-field
              v-model="state.mediaObject.originalFilename"
              class="text-input-secondary"
              label="filename"
            />
          </v-col>
          <v-col cols="12" xs="12" sm="3" class="px-2">
            <v-text-field
              v-model="state.mediaObject.mimeType"
              label="mime type"
            />
          </v-col>
          <v-col cols="12" xs="12" sm="3" class="px-2">
            <v-text-field v-model="state.mediaObject.size" label="size" />
          </v-col>
        </v-row>
      </data-expansion-panel>
    </v-expansion-panels>
    <v-row>
      <v-col cols="12" xs="12" sm="3" class="pl-8">
        <v-text-field
          :model-value="parseIso(state.uploadDate)?.toLocaleString()"
          label="upload date"
        />
      </v-col>
    </v-row>
  </lazy-data-item-read-only-form>
</template>
