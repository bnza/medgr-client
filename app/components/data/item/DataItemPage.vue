<script setup lang="ts" generic="K extends ApiDataResourceKey">
import type {
  ApiAction,
  ApiDataResource,
  ApiDataResourceKey,
  ApiResourceCollectionParent,
  ResourceConfig,
} from '~~/types'

import useResourceItemSubmit from '~/composables/useResourceItemSubmit'
import useResourceItemPage from '~/composables/useResourceItemPage'
import usePageResourceCollectionParent from '~/composables/usePageResourceCollectionParent'
import type ResourceRepository from '~/utils/repository/ResourceRepository'

interface SlotProps<K extends ApiDataResourceKey> {
  resourceConfig: ResourceConfig
  item: Ref<ApiDataResource<K>>
  repository: ResourceRepository<ApiDataResource<K>>
  parent?: ApiResourceCollectionParent
}

// 2. Define slots with the typed props
defineSlots<{
  default: (props: SlotProps<K>) => any
  'toolbar-append': (props: { item: Ref<ApiDataResource<K>> }) => any
}>()

const props = withDefaults(
  defineProps<{
    codeKey?: string
    mode: ApiAction
    resourceKey: K
    appendIcons?: boolean
  }>(),
  {
    codeKey: 'id',
    appendIcons: true,
  },
)

const { getAsyncData, label, resourceConfig, repository } = useResourceItemPage(
  props.resourceKey,
  props.mode,
)

const { item, status, error } = await getAsyncData()

const code = computed(() => {
  if (!props.codeKey || !item.value) return '?'
  if (props.codeKey in item.value && Boolean(item.value[props.codeKey])) {
    return String(item.value[props.codeKey])
  }
  return '?'
})

const resourceItemSubmit = useResourceItemSubmit()
provide(resourceItemSubmitInjectionKey, resourceItemSubmit)
const { triggerSubmit, submitStatus } = resourceItemSubmit

const { parent }: { parent: Ref<ApiResourceCollectionParent | undefined> } =
  props.mode === 'create'
    ? usePageResourceCollectionParent(true)
    : { parent: ref(undefined) }

const { collection, back } = useAppNavigation(props.mode === 'delete')
</script>

<template>
  <resource-not-found
    v-if="error"
    :path="resourceConfig.appPath"
    :error="error"
  />
  <data-card
    v-if="status === 'success' && 'undefined' !== typeof item"
    :title="label"
    :code
    :color="DATA_API_ACTIONS_BAR_COLOR[props.mode]"
  >
    <template #toolbar-prepend>
      <navigation-resource-collection-back
        :replace="mode !== 'read'"
        :history="mode === 'read'"
      />
    </template>
    <template #toolbar-append>
      <v-btn-group
        v-if="mode === 'read'"
        rounded="lg"
        variant="text"
        class="mr-2"
      >
        <slot name="toolbar-append" :item="item" />
        <lazy-navigation-resource-item-update
          v-if="appendIcons"
          :id="item.id"
          size="x-large"
          :disabled="!item._acl?.canUpdate"
          :app-path="resourceConfig.appPath"
        />
        <lazy-navigation-resource-item-delete
          v-if="appendIcons"
          :id="item.id"
          size="default"
          :disabled="!item._acl?.canDelete"
          :app-path="resourceConfig.appPath"
          @click="collection = back || resourceConfig.appPath"
        />
      </v-btn-group>
      <v-btn
        v-else-if="submitStatus !== 'success'"
        rounded="lg"
        class="mr-4"
        data-testid="submit-form-button"
        variant="tonal"
        :text="mode"
        :disabled="submitStatus === 'pending'"
        @click="triggerSubmit = true"
      />
    </template>
    <slot :resource-config :item :repository :parent />
  </data-card>
</template>
