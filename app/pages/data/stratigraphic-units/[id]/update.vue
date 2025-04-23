<script setup lang="ts"></script>

<template>
  <lazy-data-item-page
    mode="update"
    resource-key="stratigraphicUnit"
    code-key="code"
  >
    <template #default="{ item, repository, resourceConfig }">
      <lazy-data-item-stratigraphic-unit-form
        mode="update"
        :item
        :repository
        :resource-config
      />
    </template>
  </lazy-data-item-page>
</template>
