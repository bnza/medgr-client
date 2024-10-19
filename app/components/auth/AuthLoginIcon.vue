<script setup lang="ts">
const route = useRoute()
const { set } = useLoginRedirectFromStore()
</script>

<template>
  <v-btn
    icon
    nuxt
    to="/login"
    data-testid="login-button"
    @click="set(route.fullPath)"
  >
    <v-icon class="mx-3" icon="fas fa-right-to-bracket" />
    <v-tooltip activator="parent" location="bottom">Login</v-tooltip>
  </v-btn>
</template>
