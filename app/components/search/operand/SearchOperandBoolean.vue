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
</script>

<template>
  <v-checkbox
    v-model="operand"
    label="value"
    :rules="[defined]"
    :indeterminate="'undefined' === typeof operand"
  />
</template>
