<script setup lang="ts">
import type { ApiResourceUser, UserChangePasswordBody } from '~~/types'

defineProps<{
  item: Pick<ApiResourceUser, 'id' | 'email'>
  mode: 'reset' | 'change'
}>()

const {
  changePassword,
  isPasswordDialogOpen,
  plainPassword,
  resetPassword,
  submitStatus,
} = injectUserPassword()

const copyToClipboard = useCopyToClipboard()

const changePasswordRequestBody = ref<UserChangePasswordBody>({
  oldPassword: '',
  newPassword: '',
  repeatPassword: '',
})
</script>

<template>
  <v-dialog
    :model-value="isPasswordDialogOpen"
    persistent
    data-testid="user-pw-dialog"
  >
    <v-card width="400px" class="mx-auto">
      <template #title>
        <span class="text-secondary" data-testid="user-pw-identifier">{{
          item.email
        }}</span>
      </template>
      <template #text>
        <v-container v-if="submitStatus === 'pending'" style="height: 200px">
          <v-row align-content="center" class="fill-height" justify="center">
            <v-col class="text-subtitle-1 text-center" cols="12">
              {{ mode === 'reset' ? 'Resetting' : 'Changing' }} password
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
        <user-password-dialog-content-show
          v-else-if="plainPassword"
          :plain-password
        />
        <user-password-dialog-content-reset v-else-if="mode === 'reset'" />
        <user-password-dialog-content-change
          v-else-if="mode === 'change'"
          v-model="changePasswordRequestBody"
        />
      </template>
      <template #actions>
        <v-btn
          color="anchor"
          variant="tonal"
          rounded="lg"
          text="close"
          :disabled="submitStatus === 'pending'"
          @click="isPasswordDialogOpen = false"
        />
        <v-spacer />
        <v-btn
          v-if="plainPassword"
          color="secondary"
          variant="tonal"
          rounded="lg"
          text="copy"
          :disabled="submitStatus === 'pending'"
          @click="copyToClipboard(plainPassword)"
        />
        <v-btn
          v-else-if="mode === 'reset'"
          color="secondary"
          variant="tonal"
          rounded="lg"
          text="reset"
          :disabled="submitStatus === 'pending'"
          @click="resetPassword(item.id)"
        />
        <v-btn
          v-else-if="mode === 'change'"
          color="secondary"
          variant="tonal"
          rounded="lg"
          text="submit"
          :disabled="
            submitStatus === 'pending' || !changePasswordRequestBody.newPassword
          "
          @click="changePassword(changePasswordRequestBody)"
        />
      </template>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
