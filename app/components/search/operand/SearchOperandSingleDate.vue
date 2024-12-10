<script setup lang="ts">
const { parse, removeDateTimezoneOffset } = useAppDate()
const operands = defineModel<[string | undefined]>({
  required: true,
})
const operand = computed({
  get() {
    return parse(operands.value[0])
  },

  set(value: Date | undefined) {
    operands.value = value
      ? [removeDateTimezoneOffset(value).toISOString()]
      : [undefined]
  },
})
</script>

<template>
  <date-field-picker
    v-model="operand"
    :readonly="false"
    data-testid="search-operand-date"
    label="value"
    :rules="[required]"
  />
</template>
