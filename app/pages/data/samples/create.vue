<template>
  <lazy-data-item-page resource-key="sample" mode="create">
    <template #default="{ item, repository, resourceConfig, parent }">
      <lazy-data-item-sample-form
        :mode="'create'"
        :item
        :parent
        :repository
        :resource-config
      />
    </template>
  </lazy-data-item-page>
</template>
