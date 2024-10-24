<script setup>
const operands = defineModel({
  required: true,
})
const operand = computed({
  get() {
    return operands.value[0]
  },

  set(value) {
    operands.value = [value]
  },
})
</script>

<template>
  <api-resource-site-autocomplete v-model="operand" label="value" />
</template>
