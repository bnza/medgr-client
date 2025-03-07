<script setup lang="ts">
import type { ApiId, ApiResourceMediaObjectJoin } from '~~/types'
import { useMediaObject } from '~/composables/useMediaObject'

const props = defineProps<{
  apiBaseUrl: string
  item: ApiResourceMediaObjectJoin
  index: number
  canUpdate: boolean
}>()

const { deletingItem } = injectMediaObjectJoin()
// const mediaObject = props.item.mediaObject
// const mediaUrl = props.apiBaseUrl + mediaObject.contentUrl
// const hasThumbnail = [
//   'application/pdf',
//   'image/jpeg',
//   'image/png',
//   'image/webp',
//   'image/gif',
// ].includes(mediaObject.mimeType)
// const thumbnail = hasThumbnail
//   ? mediaUrl.replace(/\.(\w+)$/, '.thumb.jpeg')
//   : ''
// const fileName = mediaObject.originalFilename.replace(/\.(\w+)$/, '')
// const extension = mediaObject.originalFilename.slice(fileName.length + 1)
// const icons: Record<string, string> = {
//   'application/vnd.oasis.opendocument.spreadsheet': 'far fa-file-excel',
//   'application/vnd.ms-excel': 'far fa-file-excel',
//   'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
//     'far fa-file-excel',
// }
// const icon = icons[mediaObject.mimeType] || 'fa fa-file'

const { mediaUrl, hasThumbnail, thumbnail, fileName, icon, iconColor } =
  useMediaObject(props.item.mediaObject, props.apiBaseUrl)

defineEmits<{ delete: [id: ApiId]; click: [index: number] }>()
</script>

<template>
  <v-card
    data-testid="media-object-join-card"
    class="mx-auto my-4"
    width="200"
    variant="outlined"
    color="surface-variant"
  >
    <v-img
      v-if="hasThumbnail"
      :lazy-src="thumbnail"
      :src="thumbnail"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      height="200"
      width="200"
      class="bg-grey-lighten-2 align-end"
      cover
      @click="$emit('click', index)"
    >
      <v-card-title class="text-body-2 text-white">{{ fileName }}</v-card-title>
      <template #placeholder>
        <v-row align-content="center" class="fill-height" justify="center">
          <v-progress-circular color="warning" indeterminate />
        </v-row>
      </template>
    </v-img>
    <v-img
      v-else
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      height="200"
      width="200"
      class="bg-grey-lighten-2 align-end"
      cover
      @click="$emit('click', index)"
    >
      <v-card-title class="text-body-2 text-white">{{ fileName }}</v-card-title>
      <template #placeholder>
        <v-row align-content="center" class="fill-height" justify="center">
          <v-icon :icon size="90" :color="iconColor" />
        </v-row>
      </template>
    </v-img>
    <template #actions>
      <v-btn
        v-if="canUpdate"
        class="mr-4"
        density="compact"
        :icon="true"
        variant="text"
        data-testid="delete-media-button"
        color="error"
        @click="deletingItem = item"
      >
        <v-icon icon="fa fa-minus" />
        <v-tooltip activator="parent" location="bottom">Delete media</v-tooltip>
      </v-btn>
      <v-spacer />
      <v-btn
        class="mr-4"
        density="compact"
        :icon="true"
        data-testid="download-media-button"
        :href="mediaUrl"
        target="_blank"
        download
      >
        <v-icon icon="fas fa-download" />
        <v-tooltip activator="parent" location="bottom">download</v-tooltip>
      </v-btn>
    </template>
  </v-card>
</template>
