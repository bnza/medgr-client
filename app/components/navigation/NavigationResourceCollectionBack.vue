<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    replace?: boolean
    tooltipText?: string
    history: boolean
  }>(),
  {
    replace: false,
    tooltipText: 'Back',
    history: false,
  },
)
const { back, pop } = useAppNavigation()
const clicked = ref(false)
const to = computed(() =>
  props.history ? back.value : history.state?.back || '/',
)
onUnmounted(() => {
  if (clicked.value && props.history) {
    pop()
  }
})
</script>

<template>
  <v-tooltip location="bottom" :text="tooltipText">
    <template #activator="{ actProps }">
      <NuxtLink
        :to
        :replace
        data-testid="navigation-link-back"
        @click="clicked = true"
      >
        <v-icon class="mx-3" v-bind="actProps" icon="fas fa-arrow-left" />
      </NuxtLink>
    </template>
  </v-tooltip>
</template>
