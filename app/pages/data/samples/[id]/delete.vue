<template>
  <lazy-data-item-page mode="delete" resource-key="sample" code-key="code">
    <template #default="{ item, repository, resourceConfig }">
      <lazy-data-item-sample-form
        mode="delete"
        :item
        :repository
        :resource-config
      />
    </template>
  </lazy-data-item-page>
</template>
