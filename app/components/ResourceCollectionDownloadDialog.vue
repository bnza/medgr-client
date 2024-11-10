<script setup lang="ts">
import type { ResourceCollectionCacheKey } from '~~/types'

const props = defineProps<{
  resourceCollectionCacheKey: ResourceCollectionCacheKey
}>()

const model = defineModel<boolean>({ required: true })
const { label, downloadAndFeedback, filteredItemsCount, status } =
  useResourceCollectionDownload(props.resourceCollectionCacheKey)

const submit = async () => {
  await downloadAndFeedback()
  model.value = status.value !== 'success'
}
</script>

<template>
  <v-dialog
    v-model="model"
    width="400px"
    :persistent="true"
    data-testid="download-collection-dialog"
  >
    <v-card>
      <v-card-title>Resource: {{ label }}</v-card-title>
      <v-card-text>
        <v-container v-if="status === 'pending'" style="height: 200px">
          <v-row align-content="center" class="fill-height" justify="center">
            <v-col class="text-subtitle-1 text-center" cols="12">
              Download in progress
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
        <v-container v-else style="height: 200px">
          <v-row class="mx-4 pt-4" justify="center">
            <v-spacer />
            <v-col cols="12" sm="2">
              <v-icon icon="fas fa-circle-info" size="large" color="info" />
            </v-col>
            <v-spacer />
          </v-row>
          <v-row dense class="my-0 py-0 mx-4 pt-8 text-center" justify="center">
            Are you sure you want to download
          </v-row>
          <v-row
            data-testid="download-resource-total-items"
            dense
            class="my-0 pt-0 mx-4 text-center text-secondary font-weight-bold"
            justify="center"
          >
            {{ filteredItemsCount }}
          </v-row>
          <v-row dense class="my-0 pt-0 mx-4 text-center" justify="center">
            selected items?
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-tooltip location="bottom" text="Close">
          <template #activator="{ tooltipProps }">
            <v-btn
              :disabled="status === 'pending'"
              color="anchor"
              v-bind="tooltipProps"
              text="close"
              @click="model = false"
            />
          </template>
        </v-tooltip>
        <v-spacer />
        <v-tooltip location="bottom" text="Download">
          <template #activator="{ tooltipProps }">
            <v-btn
              :disabled="status === 'pending'"
              data-testid="submit-download-resource-button"
              color="primary"
              v-bind="tooltipProps"
              text="download"
              @click="submit()"
            />
          </template>
        </v-tooltip>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
