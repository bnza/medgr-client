<script setup lang="ts">
import type {
  ApiResourceStratigraphicUnitsRelationship,
  ResourceConfig,
  StratigraphicUnitRelationshipKey,
} from '~~/types'

import { injectStratigraphicUnitsRelationship } from '~/composables/useStratigraphicUnitsRelationship'
import { stratigraphicUnitRelationshipMap } from '~/utils/resources/vocabularies'

const props = defineProps<{
  relationshipKey: StratigraphicUnitRelationshipKey
  resourceConfig: ResourceConfig
  items?: Array<ApiResourceStratigraphicUnitsRelationship>
}>()

const { isEditable, creatingRelationshipType } =
  injectStratigraphicUnitsRelationship()
const name = stratigraphicUnitRelationshipMap[props.relationshipKey]
const { items } = toRefs(props)

const relationships = computed(() =>
  items.value
    ? items.value.filter(
        (current) => current.relationship.slice(-1) === props.relationshipKey,
      )
    : [],
)
</script>

<template>
  <v-card
    data-testid="su-relationship-card"
    height="100%"
    min-height="100px"
    class="mx-auto"
    variant="outlined"
    color="grey lighten-2"
    :title="name"
  >
    <template #append>
      <v-btn
        v-if="isEditable"
        data-testid="add-relationship-button"
        class="mx-4"
        color="anchor"
        rounded="false"
        variant="text"
        :icon="true"
        size="x-small"
        @click="creatingRelationshipType = relationshipKey"
      >
        <v-icon icon="fas fa-plus" size="x-small" />
        <v-tooltip activator="parent" location="bottom"
          >Add relationship
        </v-tooltip>
      </v-btn>
    </template>
    <v-card-text>
      <v-chip-group>
        <sus-relationship-chip
          v-for="item in relationships"
          :key="item.id"
          :item
          :resource-config
        />
      </v-chip-group>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.mx-auto:deep(.v-card-title) {
  color: white;
  margin-left: 16px;
  font-size: 14px;
  text-transform: uppercase !important;
  min-height: 32px !important;
}
</style>
