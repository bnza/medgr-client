<script setup lang="ts">
import type { BaseAcl } from '~~/types'
import { defaultBaseAcl } from '~/utils/consts'

const props = defineProps<{
  appPath: string
  id: string | number
  acl?: Partial<BaseAcl>
}>()

const aclComputed = computed(() =>
  Object.assign({}, defaultBaseAcl, props.acl || {}),
)

// This component should be used only in collection's tables so current route path is set in
// delete collection redirect path
const { path } = useRoute()

const { collection } = useAppNavigation()
</script>

<template>
  <v-btn-group variant="text" rounded="lg" class="item-nav">
    <slot name="prepend" />
    <navigation-resource-item-read
      :id
      :app-path
      :disabled="!aclComputed.canRead"
    />
    <navigation-resource-item-update
      :id
      :app-path
      :disabled="!aclComputed.canUpdate"
    />
    <navigation-resource-item-delete
      :id
      :app-path
      :disabled="!aclComputed.canDelete"
      @click="collection = path"
    />
    <slot name="append" />
  </v-btn-group>
</template>
