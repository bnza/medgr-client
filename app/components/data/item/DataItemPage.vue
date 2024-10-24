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
const { triggerSubmit } = resourceItemSubmit

const { parent } =
  props.mode === 'create'
    ? usePageResourceCollectionParent(true)
    : { parent: ref(undefined) }
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
      <navigation-resource-collection-back :replace="mode !== 'read'" />
    </template>
    <template #toolbar-append>
      <slot name="toolbar-append" :item="item" />
      <v-btn
        v-if="mode !== 'read'"
        color="anchor"
        data-testid="submit-button"
        rounded="false"
        variant="text"
        icon
        @click="triggerSubmit = true"
      >
        <v-icon icon="fas fa-arrow-up-from-bracket" />
        <v-tooltip activator="parent" location="bottom"
          >Submit {{ mode }}</v-tooltip
        >
      </v-btn>
    </template>
    <slot :resource-config :item :repository :parent />
  </data-card>
</template>

<style scoped></style>
