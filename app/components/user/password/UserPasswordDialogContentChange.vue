<script setup lang="ts">
import useUserChangePasswordValidation from '~/composables/validation/useUserChangePasswordValidation'
import type { UserChangePasswordBody } from '~~/types'
import { VForm } from 'vuetify/components'

enum Form {
  OldPassword,
  NewPassword,
  RepeatPassword,
}
const showPassword = reactive([false, false, false])
const fieldTypes = computed(() =>
  showPassword.map((show) => (show ? 'text' : 'password')),
)
const icons = computed(() =>
  showPassword.map((show) => `fas fa-eye${show ? '' : '-slash'}`),
)
const toggleShow = (index: number) => {
  showPassword[index] = !showPassword[index]
}
const state = reactive({
  oldPassword: '',
  newPassword: '',
  repeatPassword: '',
})

const form = useTemplateRef<VForm>('form')

const changePasswordRequestBody = defineModel<UserChangePasswordBody | {}>({})
watchEffect(() => {
  if (form.value) {
    changePasswordRequestBody.value = form.value.isValid ? clone(state) : {}
  }
})

const getRules = useUserChangePasswordValidation()
</script>

<template>
  <v-form :ref="'form'" @submit.prevent>
    <v-container>
      <v-row class="mx-4 pt-4" justify="center">
        <v-text-field
          v-model="state.oldPassword"
          autocomplete="new-password"
          :type="fieldTypes[Form.OldPassword]"
          :rules="getRules('oldPassword')"
          label="old password"
          :append-inner-icon="icons[Form.OldPassword]"
          @click:append-inner="toggleShow(Form.OldPassword)"
        />
      </v-row>
      <v-row class="mx-4 pt-8">
        <v-text-field
          v-model="state.newPassword"
          autocomplete="new-password"
          :type="fieldTypes[Form.NewPassword]"
          :rules="getRules('newPassword')"
          label="new password"
          :append-inner-icon="icons[Form.NewPassword]"
          @click:append-inner="toggleShow(Form.NewPassword)"
        />
      </v-row>
      <v-row class="mx-4 pt-8">
        <v-text-field
          v-model="state.repeatPassword"
          autocomplete="new-password"
          :type="fieldTypes[Form.RepeatPassword]"
          :rules="getRules('repeatPassword')"
          :validation-value="state"
          label="repeat password"
          :append-inner-icon="icons[Form.RepeatPassword]"
          @click:append-inner="toggleShow(Form.RepeatPassword)"
          @input="form?.validate()"
        />
      </v-row>
    </v-container>
  </v-form>
</template>
