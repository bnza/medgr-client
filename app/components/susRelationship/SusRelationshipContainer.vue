<script setup lang="ts">
import type {
  ApiAclResource,
  ApiResourceStratigraphicUnit,
  ResourceConfig,
} from '~~/types'

const props = defineProps<{
  sxSu: ApiAclResource & ApiResourceStratigraphicUnit
}>()

const stratigraphicUnitsRelationship = useStratigraphicUnitsRelationship(
  props.sxSu,
)

provide(
  stratigraphicUnitsRelationshipInjectionKey,
  stratigraphicUnitsRelationship,
)

const { fetchCollection, items, refresh, isReadonly } =
  stratigraphicUnitsRelationship

await fetchCollection()

const lockedIcon = computed(() =>
  isReadonly.value ? 'fas fa-lock' : 'fas fa-lock-open',
)
const lockedTooltipText = computed(() =>
  isReadonly.value ? 'Enable editing' : 'Disable editing',
)
const toggleReadonly = () => (isReadonly.value = !isReadonly.value)

const suResourceConfig: ResourceConfig =
  useApiResourceConfig('stratigraphicUnit')
</script>

<template>
  <v-container data-testid="su-relationships-container">
    <sus-relationship-delete-dialog @refresh="refresh()" />
    <sus-relationship-create-dialog @refresh="refresh()" />
    <v-row dense justify="end" style="min-height: 48px">
      <v-col class="text-right">
        <v-btn
          v-if="sxSu._acl.canUpdate"
          color="anchor"
          rounded="false"
          variant="text"
          icon
          data-testid="enable-editing-button"
          @click="toggleReadonly"
        >
          <v-icon :icon="lockedIcon" color="primary" />
          <v-tooltip activator="parent" location="bottom">
            {{ lockedTooltipText }}
          </v-tooltip>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <sus-relationship-card
          relationship-key="c"
          :items
          :resource-config="suResourceConfig"
        />
      </v-col>
      <v-col>
        <sus-relationship-card
          relationship-key="C"
          :items
          :resource-config="suResourceConfig"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <sus-relationship-card
          relationship-key="x"
          :items
          :resource-config="suResourceConfig"
        />
      </v-col>
      <v-col>
        <sus-relationship-card
          relationship-key="X"
          :items
          :resource-config="suResourceConfig"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <sus-relationship-card
          relationship-key="f"
          :items
          :resource-config="suResourceConfig"
        />
      </v-col>
      <v-col>
        <sus-relationship-card
          relationship-key="F"
          :items
          :resource-config="suResourceConfig"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <sus-relationship-card
          relationship-key="e"
          :items
          :resource-config="suResourceConfig"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
