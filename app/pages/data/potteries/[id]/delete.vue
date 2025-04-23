<template>
  <lazy-data-item-page mode="delete" resource-key="pottery" code-key="code">
    <template #default="{ item, repository, resourceConfig }">
      <lazy-data-item-pottery-form
        mode="delete"
        :item
        :repository
        :resource-config
      />
    </template>
  </lazy-data-item-page>
</template>
