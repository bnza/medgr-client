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
</script>

<template>
  <div class="item-nav">
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
    />
    <slot name="append" />
  </div>
</template>
