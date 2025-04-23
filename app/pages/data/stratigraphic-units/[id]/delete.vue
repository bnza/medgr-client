<script setup lang="ts"></script>

<template>
  <lazy-data-item-page
    mode="delete"
    resource-key="stratigraphicUnit"
    code-key="code"
  >
    <template #default="{ item, repository, resourceConfig }">
      <lazy-data-item-stratigraphic-unit-form
        mode="delete"
        :item
        :repository
        :resource-config
      />
    </template>
  </lazy-data-item-page>
</template>
