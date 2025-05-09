<script setup lang="ts"></script>

<template>
  <map-layer-vector-api-base>
    <template #default="{ format }">
      <map-source-vector-api :format :resource-key="'site'" />
    </template>
  </map-layer-vector-api-base>
</template>
