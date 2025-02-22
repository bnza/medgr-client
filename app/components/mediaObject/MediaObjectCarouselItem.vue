<script setup lang="ts">
import type { ApiResourceMediaObjectJoin } from '~~/types'
import { useMediaObject } from '~/composables/useMediaObject'

const props = defineProps<{
  item: ApiResourceMediaObjectJoin
  apiBaseUrl: string
}>()

const { mediaUrl, thumbnail, iconColor, icon } = useMediaObject(
  props.item.mediaObject,
  props.apiBaseUrl,
)
</script>

<template>
  <v-carousel-item>
    <v-container fluid height="600px">
      <v-row>
        <v-col cols="6">
          <a :href="mediaUrl" target="_blank" download>
            <v-img
              v-if="item.mediaObject.mimeType === 'image/jpeg'"
              :src="mediaUrl"
              max-height="600px"
            >
              <v-tooltip
                activator="parent"
                location="top center"
                origin="overlap"
                >click to download</v-tooltip
              >
            </v-img>
            <v-img
              v-if="item.mediaObject.mimeType === 'application/pdf'"
              :src="thumbnail"
              max-height="600px"
            >
              <v-tooltip
                activator="parent"
                location="top center"
                origin="overlap"
                >click to download</v-tooltip
              >
            </v-img>
            <v-sheet
              v-else
              class="blank"
              color="anchor"
              tile
              max-height="600px"
            >
              <v-row
                align-content="center"
                class="fill-height"
                justify="center"
              >
                <v-icon :icon size="120" :color="iconColor" />
              </v-row>
              <v-tooltip
                activator="parent"
                location="top center"
                origin="overlap"
                >click to download</v-tooltip
              >
            </v-sheet>
          </a>
        </v-col>
        <v-col cols="6">
          <v-form readonly class="mr-12">
            <v-container>
              <v-row>
                <v-col>
                  <v-text-field
                    variant="solo"
                    flat
                    label="filename"
                    :model-value="item.mediaObject.originalFilename"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    variant="solo"
                    flat
                    label="mime type"
                    :model-value="item.mediaObject.mimeType"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    variant="solo"
                    flat
                    label="size"
                    :model-value="item.mediaObject.size"
                  />
                </v-col> </v-row
              ><v-row>
                <v-col>
                  <v-textarea
                    variant="solo"
                    flat
                    label="description"
                    :model-value="item.description"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-carousel-item>
</template>

<style scoped>
.blank {
  height: 100%;
  aspect-ratio: 3 / 4;
  margin: auto;
}
</style>
