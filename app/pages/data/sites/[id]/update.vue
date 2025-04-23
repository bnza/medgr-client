<template>
  <lazy-data-item-page mode="update" resource-key="site" code-key="code">
    <template #default="{ item, repository, resourceConfig }">
      <lazy-data-item-site-form
        mode="update"
        :item
        :repository
        :resource-config
      />
    </template>
  </lazy-data-item-page>
</template>
