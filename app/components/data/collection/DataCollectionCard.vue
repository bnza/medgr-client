<script setup lang="ts">
import type { ApiResourceCollectionParent, ApiDataResourceKey } from '~~/types'

const props = withDefaults(
  defineProps<{
    resourceKey: ApiDataResourceKey
    parent?: ApiResourceCollectionParent
    downloadButton?: boolean
    createButton?: boolean
    searchButton?: boolean
  }>(),
  {
    downloadButton: true,
    createButton: false,
    searchButton: true,
    parent: undefined,
  },
)

const { collectionCacheKey, label, resourceConfig } = useResourceCollection(
  props.resourceKey,
  props.parent,
)

const collectionTableComponentsMap: Partial<
  Record<ApiDataResourceKey, ReturnType<typeof defineAsyncComponent>>
> = {
  microStratigraphicUnit: defineAsyncComponent(
    () =>
      import(
        '~/components/data/collection/DataCollectionMicroStratigraphicUnitTable.vue'
      ),
  ),
  pottery: defineAsyncComponent(
    () => import('~/components/data/collection/DataCollectionPotteryTable.vue'),
  ),
  sample: defineAsyncComponent(
    () => import('~/components/data/collection/DataCollectionSampleTable.vue'),
  ),
  site: defineAsyncComponent(
    () => import('~/components/data/collection/DataCollectionSiteTable.vue'),
  ),
  sitesUser: defineAsyncComponent(
    () =>
      import('~/components/data/collection/DataCollectionSitesUserTable.vue'),
  ),
  stratigraphicUnit: defineAsyncComponent(
    () =>
      import(
        '~/components/data/collection/DataCollectionStratigraphicUnitTable.vue'
      ),
  ),
  user: defineAsyncComponent(
    () => import('~/components/data/collection/DataCollectionUserTable.vue'),
  ),
}
const collectionTableComponent = computed(
  () => collectionTableComponentsMap[props.resourceKey],
)

const { isAuthenticated } = useAppAuth()
</script>

<template>
  <data-card
    :rounded="false"
    :title="parent ? '' : label"
    :child="Boolean(parent)"
  >
    <!--        <template #title-append>-->
    <!--          <lazy-data-toolbar-title-append-->
    <!--            v-if="isFiltered"-->
    <!--            text="filtered"-->
    <!--            :color="COLORS['secondary']"-->
    <!--          />-->
    <!--        </template>-->
    <template #toolbar-append>
      <lazy-navigation-resource-collection-download
        v-if="downloadButton && isAuthenticated"
        :resource-collection-cache-key="collectionCacheKey"
      />
      <lazy-navigation-resource-item-create
        v-if="createButton"
        :app-path="resourceConfig.appPath"
        :parent
      />
      <lazy-navigation-resource-collection-search
        v-if="searchButton"
        :resource-config="resourceConfig"
        :parent
      />
    </template>
    <Suspense>
      <component
        :is="collectionTableComponent"
        data-testid="data-collection-table"
        :parent
      />
      <template #fallback>
        <loading-component />
      </template>
    </Suspense>
  </data-card>
</template>
