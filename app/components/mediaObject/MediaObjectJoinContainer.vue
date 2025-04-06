<script setup lang="ts">
import type { ApiDataResourceKey, ApiResourceCollectionParent } from '~~/types'

import { mediaObjectJoinInjectionKey } from '~/composables/useMediaObjectJoin'

const props = defineProps<{
  resourceKey: ApiDataResourceKey
  parent: ApiResourceCollectionParent
  canUpdate: boolean
}>()

const mediaObjectJoin = await useMediaObjectJoin(
  props.resourceKey,
  props.parent,
)
provide(mediaObjectJoinInjectionKey, mediaObjectJoin)
const { items } = mediaObjectJoin

const config = useRuntimeConfig()
const apiBaseUrl = config.public.apiBaseUrl

const isCreateDialogOpen = ref(false)

const isCarouselOpen = ref(false)
const carouselModel = ref(0)
const openCarousel = (index: number) => {
  carouselModel.value = index
  isCarouselOpen.value = true
}
</script>

<template>
  <media-object-carousel
    v-if="isCarouselOpen"
    v-model="carouselModel"
    :items
    :api-base-url
    @close="isCarouselOpen = false"
  />
  <v-container v-else data-testid="media-object-join-container">
    <media-object-join-delete-dialog />
    <media-object-join-create-dialog
      v-model="isCreateDialogOpen"
      :parent="parent[1]"
    />
    <v-row dense justify="end" style="min-height: 48px">
      <v-col class="text-right">
        <v-btn
          v-if="canUpdate"
          class="mr-4"
          density="compact"
          :icon="true"
          variant="text"
          data-testid="create-media-button"
          @click="isCreateDialogOpen = true"
        >
          <v-icon icon="fa fa-plus" size="x-large" />
          <v-tooltip activator="parent" location="bottom">Add media</v-tooltip>
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-if="items.length > 0" no-gutters>
      <v-col v-for="(item, index) of items" :key="item['@id']" cols="3">
        <media-object-card
          :item
          :index
          :api-base-url
          :can-update
          @click="openCarousel($event)"
        />
      </v-col>
    </v-row>
    <v-row v-else justify="center">
      <v-empty-state
        title="No media found"
        text="No media are currently related to this item"
      />
    </v-row>
  </v-container>
</template>
