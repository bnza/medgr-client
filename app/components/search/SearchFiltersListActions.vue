<script setup lang="ts">
import { injectResourceCollectionFilters } from '~/composables/useResourceCollectionFilters'

const { isEmpty, isChanged, setFiltersAndClose, clearFilters, resourceConfig } =
  injectResourceCollectionFilters()

const to = computed(() => history.state.back || resourceConfig.appPath)
</script>

<template>
  <v-spacer />
  <v-btn variant="text" nuxt data-testid="close-button" color="anchor" :to>
    Close
  </v-btn>
  <v-btn
    variant="text"
    :disabled="isEmpty"
    data-testid="clear-button"
    color="anchor"
    @click="clearFilters()"
  >
    Clear
  </v-btn>
  <v-spacer />
  <v-btn
    data-testid="submit-filters-button"
    class="mx-4"
    color="primary"
    :disabled="!isChanged"
    @click="setFiltersAndClose()"
  >
    Submit
  </v-btn>
  <v-spacer />
</template>
