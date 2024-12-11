<script setup lang="ts">
import type { ApiResourceStratigraphicUnitsRelationship } from '~~/types'
import { injectStratigraphicUnitsRelationship } from '~/composables/useStratigraphicUnitsRelationship'

defineProps<{ item: ApiResourceStratigraphicUnitsRelationship }>()
const { isEditable, deletingRelation } = injectStratigraphicUnitsRelationship()
</script>

<template>
  <v-chip class="text-white" data-testid="su-relationship-chip">
    {{ item.dxSU.code.replace(/^\w+\./, '') }}
    <template #close>
      <v-icon
        v-if="isEditable"
        data-testid="delete-relationship-button"
        icon="far fa-circle-xmark"
        size="x-small"
        @click.stop="deletingRelation = item"
      />
    </template>
  </v-chip>
</template>
