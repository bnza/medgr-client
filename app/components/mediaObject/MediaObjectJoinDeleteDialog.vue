<script setup lang="ts">
const { submitStatus, deletingItem, deleteAndFeedback } =
  injectMediaObjectJoin()
</script>

<template>
  <v-dialog :model-value="Boolean(deletingItem)" max-width="400px" persistent>
    <v-card data-testid="delete-media-object-card">
      <v-card-text class="text-center">
        <v-container v-if="submitStatus === 'pending'" style="height: 150px">
          <v-row align-content="center" class="fill-height" justify="center">
            <v-col class="text-subtitle-1 text-center" cols="12">
              Deleting
            </v-col>
            <v-col cols="6">
              <v-progress-linear
                color="warning"
                height="6"
                indeterminate
                rounded
              />
            </v-col>
          </v-row>
        </v-container>
        <v-container v-else style="height: 150px">
          <v-row align-content="center" class="fill-height" justify="center">
            <v-col class="text-subtitle-1 text-center" cols="12">
              <v-icon icon="fas fa-triangle-exclamation" color="error" />
              <br />
              <br />
              Are you sure you want to delete this media object?
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn color="anchor" @click="deletingItem = undefined">close</v-btn>
        <v-btn color="error" @click="deleteAndFeedback()">delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
