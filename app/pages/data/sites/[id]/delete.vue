<template>
  <lazy-data-item-page mode="delete" resource-key="site" code-key="code">
    <template #default="{ item, repository, resourceConfig }">
      <lazy-data-item-site-form
        mode="delete"
        :item
        :repository
        :resource-config
      />
    </template>
  </lazy-data-item-page>
</template>
