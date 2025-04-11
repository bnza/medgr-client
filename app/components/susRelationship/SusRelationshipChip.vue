<script setup lang="ts">
import type {
  ApiResourceStratigraphicUnitsRelationship,
  ResourceConfig,
} from '~~/types'
import { injectStratigraphicUnitsRelationship } from '~/composables/useStratigraphicUnitsRelationship'

defineProps<{
  item: ApiResourceStratigraphicUnitsRelationship
  resourceConfig: ResourceConfig
}>()
const { isEditable, deletingRelation } = injectStratigraphicUnitsRelationship()
</script>

<template>
  <lazy-data-item-info-box-stratigraphic-unit
    :id="item.dxSU.id"
    :resource-config
  >
    <template #activator="{ props }">
      <v-chip
        v-bind="props"
        class="text-white"
        data-testid="su-relationship-chip"
      >
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
  </lazy-data-item-info-box-stratigraphic-unit>
</template>
