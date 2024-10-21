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
  <v-text-field
    v-model="operand"
    data-testid="search-operand-single"
    label="value"
    :rules="[required]"
  />
</template>
