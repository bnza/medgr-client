<script setup lang="ts"></script>

<template>
  <api-resource-autocomplete label="sample" path="samples">
    <template #selection="{ props, item }">
      <v-list-item v-bind="props">
        <template #title
          ><span class="text-secondary font-weight-bold">{{
            item.raw.code
          }}</span>
        </template>
      </v-list-item>
    </template>
  </api-resource-autocomplete>
</template>
