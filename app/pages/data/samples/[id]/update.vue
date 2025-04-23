<template>
  <lazy-data-item-page mode="update" resource-key="sample" code-key="code">
    <template #default="{ item, repository, resourceConfig }">
      <lazy-data-item-sample-form
        mode="update"
        :item
        :repository
        :resource-config
      />
    </template>
  </lazy-data-item-page>
</template>
