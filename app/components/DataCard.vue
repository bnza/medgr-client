<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string
    code?: string
    color?: string
    loading?: boolean
    child?: boolean
  }>(),
  { code: '', loading: false, child: false, color: undefined },
)
const cardTestId = computed(() => (props.child ? 'data-card' : 'app-data-card'))
</script>

<template>
  <v-card :data-testid="cardTestId" :rounded="false" class="w-100 h-100">
    <data-card-toolbar v-bind="$props">
      <template #toolbar-prepend>
        <slot name="toolbar-prepend" />
      </template>
      <template #title-append>
        <slot name="title-append" />
      </template>
      <template #toolbar-append>
        <slot name="toolbar-append" />
      </template>
    </data-card-toolbar>
    <slot>
      <div class="d-flex align-center justify-center" style="min-height: 400px">
        <v-progress-circular indeterminate :size="128" :width="12" />
      </div>
    </slot>
    <template #actions>
      <slot name="actions" />
    </template>
  </v-card>
</template>
