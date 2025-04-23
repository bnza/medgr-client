<template>
  <lazy-data-item-page resource-key="site" mode="create">
    <template #default="{ item, repository, resourceConfig }">
      <lazy-data-item-site-form
        :mode="'create'"
        :item
        :resource-config
        :repository
      />
    </template>
  </lazy-data-item-page>
</template>
