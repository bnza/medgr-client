<script setup lang="ts">
import type {
  ApiResourceImportedFile,
  ApiResourceWorkUnit,
  JsonLdResourceItem,
} from '~~/types'

const props = defineProps<{
  job: JsonLdResourceItem<ApiResourceWorkUnit>
}>()

const repository = useNuxtApp().$api.getRepository('importedFile')
const resourceConfig = useApiResourceConfig('importedFile')
const item = ref<JsonLdResourceItem<ApiResourceImportedFile> | null>(null)

watch(
  () => props.job.status,
  async (status) => {
    if (isSuccess(status)) {
      item.value = await repository.fetchItem(props.job.id)
    }
  },
  { immediate: true },
)
</script>

<template>
  <v-sheet>
    <data-item-imported-file-form
      v-if="item"
      :item
      :repository
      :resource-config
      data-testid="imported-file-success-form"
    />
  </v-sheet>
</template>
