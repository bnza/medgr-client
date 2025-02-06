<script setup lang="ts" generic="RT extends ApiResourceItem & ApiAclResource">
import type {
  ApiAclResource,
  ApiAction,
  ApiDataResourceKey,
  ApiResourceItem,
} from '~~/types'

import useResourceItemSubmit from '~/composables/useResourceItemSubmit'
import useResourceItemPage from '~/composables/useResourceItemPage'
import usePageResourceCollectionParent from '~/composables/usePageResourceCollectionParent'
const props = withDefaults(
  defineProps<{
    codeKey?: keyof RT
    mode: ApiAction
    resourceKey: ApiDataResourceKey
  }>(),
  {
    codeKey: 'id',
  },
)

const { getAsyncData, label, resourceConfig, repository } =
  useResourceItemPage<RT>(props.resourceKey, props.mode)

const { item, status, error } = await getAsyncData()

const code = computed(() =>
  props.mode === 'create' || !item.value
    ? ''
    : props.codeKey in item.value
      ? item.value[props.codeKey]
      : '?',
)

const resourceItemSubmit = useResourceItemSubmit()
provide(resourceItemSubmitInjectionKey, resourceItemSubmit)
const { triggerSubmit, submitStatus } = resourceItemSubmit

const { parent } =
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
          :id="item.id"
          size="x-large"
          :disabled="!item._acl?.canUpdate"
          :app-path="resourceConfig.appPath"
        />
        <lazy-navigation-resource-item-delete
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

<style scoped></style>
