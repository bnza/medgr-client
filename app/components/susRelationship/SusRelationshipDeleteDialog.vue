<script setup lang="ts">
const { isEditable, deletingRelation, submitStatus, deleteRelationship } =
  injectStratigraphicUnitsRelationship()

const emit = defineEmits<{ refresh: [] }>()

const submitDelete = async () => {
  await deleteRelationship()
  if (submitStatus.value === 'success') {
    emit('refresh')
  }
}
</script>

<template>
  <v-dialog
    :model-value="isEditable && 'undefined' !== typeof deletingRelation"
    max-width="400px"
    @after-leave="deletingRelation = undefined"
  >
    <v-card data-testid="delete-su-relationship-card">
      <v-card-text class="text-center">
        <v-icon icon="fas fa-triangle-exclamation" color="error" />
        <br />
        <br />
        Are you sure you want to delete this relationship?
      </v-card-text>
      <v-card-actions>
        <v-btn
          :disabled="submitStatus === 'pending'"
          color="error"
          @click="submitDelete"
          >delete</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
