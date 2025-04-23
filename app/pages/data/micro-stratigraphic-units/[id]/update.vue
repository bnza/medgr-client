<template>
  <lazy-data-item-page
    mode="update"
    resource-key="microStratigraphicUnit"
    code-key="code"
  >
    <template #default="{ item, repository, resourceConfig }">
      <lazy-data-item-micro-stratigraphic-unit-form
        mode="update"
        :item
        :repository
        :resource-config
      />
    </template>
  </lazy-data-item-page>
</template>
