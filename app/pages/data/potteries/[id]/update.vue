<template>
  <lazy-data-item-page mode="update" resource-key="pottery" code-key="code">
    <template #default="{ item, repository, resourceConfig }">
      <lazy-data-item-pottery-form
        mode="update"
        :item
        :repository
        :resource-config
      />
    </template>
  </lazy-data-item-page>
</template>
