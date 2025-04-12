<script setup lang="ts" generic="RT extends ApiResourceItem">
import type {
  ApiDataResourceKey,
  ApiId,
  ApiResourceItem,
  JsonLdResourceDocument,
  JsonLdResourceItem,
  ResourceConfig,
} from '~~/types'
import { mergeProps } from 'vue'
import type ResourceRepository from '~/utils/repository/ResourceRepository'
import type { AsyncDataRequestStatus } from '#app'

const props = defineProps<{
  resourceKey: ApiDataResourceKey
  id: ApiId
}>()

const resourceConfig = ref<ResourceConfig | null>(null)
const repository = ref<ResourceRepository<RT> | null>(null)

const getResourceConfig = () => {
  if (!resourceConfig.value) {
    resourceConfig.value = useApiResourceConfig(props.resourceKey)
  }
  return resourceConfig.value
}

const getRepository = () => {
  if (!repository.value) {
    repository.value = useNuxtApp().$api.getRepository(props.resourceKey)
  }
  return repository.value
}

const item = ref<JsonLdResourceDocument<JsonLdResourceItem<RT>> | null>(null)
const status = ref<AsyncDataRequestStatus>('idle')

const fetchData = async (isOpen: boolean) => {
  if (isOpen && !item.value) {
    try {
      status.value = 'pending'
      item.value = await getRepository().fetchItem(props.id)
      status.value = 'success'
    } catch (error) {
      status.value = 'error'
      console.error(error)
    }
  }
}
</script>

<template>
  <v-menu @update:model-value="fetchData">
    <template #activator="{ props: menu }">
      <v-tooltip location="top">
        <template #activator="{ props: tooltip }">
          <slot name="activator" v-bind="{ props: mergeProps(menu, tooltip) }">
            <v-btn
              color="primary"
              v-bind="mergeProps(menu, tooltip)"
              icon="fas fa-circle-info"
              size="xsmall"
              data-testid="data-info-box-activator"
            />
          </slot>
        </template>
        <span>show info</span>
      </v-tooltip>
    </template>
    <v-card
      prepend-icon="fas fa-circle-info"
      min-width="500"
      data-testid="info-box-card"
    >
      <template #title
        ><span data-testid="info-box-card-title">{{
          getResourceConfig().labels[0]
        }}</span></template
      >
      <template #text>
        <v-sheet v-if="item" data-testid="info-box-card-text">
          <slot v-bind="{ item }" />
        </v-sheet>
        <v-container
          v-else
          class="d-flex flex-column justify-center align-center"
          style="height: 100%"
        >
          <loading-component
            v-if="status === 'pending'"
            data-testid="info-box-card-pending"
          />
          <v-alert
            v-else-if="status === 'error'"
            icon="fas fa-circle-exclamation"
            text="Data fetch failed"
            data-testid="info-box-card-error"
          />
        </v-container>
      </template>
      <template #actions>
        <v-spacer />
        <navigation-resource-item-read
          :id
          :disabled="status !== 'success'"
          :app-path="getResourceConfig().appPath"
        />
      </template>
    </v-card>
  </v-menu>
</template>
