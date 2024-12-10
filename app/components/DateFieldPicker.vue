<script setup lang="ts">
import useAppDate from '~/composables/useAppDate'

defineProps<{
  label: string
  readonly: boolean
}>()
const model = defineModel<Date | undefined>()

const roDate = computed(() => model.value?.toLocaleDateString())

const { removeDateTimezoneOffset } = useAppDate()
const setDate = (date: Date): void => {
  model.value = removeDateTimezoneOffset(date)
}
const viewMode = ref<'year' | 'months' | 'month'>('year')
</script>

<template>
  <v-text-field :model-value="roDate" :label readonly>
    <v-menu v-if="!readonly" activator="parent" :close-on-content-click="false">
      <v-date-picker
        :model-value="model"
        :view-mode
        @update:model-value="setDate($event)"
        @update:year="viewMode = 'months'"
        @update:month="viewMode = 'month'"
      />
    </v-menu>
  </v-text-field>
</template>

<style scoped></style>
