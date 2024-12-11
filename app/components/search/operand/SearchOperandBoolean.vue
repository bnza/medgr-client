<script setup>
const operands = defineModel({
  required: true,
})
const operand = computed({
  get() {
    return operands.value[0]
  },

  set(value) {
    operands.value = [Boolean(value)]
  },
})
const label = computed(() =>
  'undefined' === typeof operand.value ? 'no value' : String(operand.value),
)
</script>

<template>
  <v-checkbox
    v-model="operand"
    :label
    :rules="[defined]"
    :indeterminate="'undefined' === typeof operand"
  />
</template>
