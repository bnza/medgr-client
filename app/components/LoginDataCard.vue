<script setup lang="ts">
type Credential = {
  email: string
  password: string
}

const pending = ref(false)
const email = ref('')
const password = ref('')
const loginFailed = ref(false)

const { signIn } = useAuth()
const { showSuccess } = useAppSnackbarStore()

const disabled = computed(() => {
  return !password.value || !email.value || pending.value
})

const loginRedirect = useLoginRedirectFromStore()
const { from } = storeToRefs(loginRedirect)
const router = useRouter()

const signInAndFeedback = async ({ email, password }: Credential) => {
  pending.value = true
  loginFailed.value = false
  try {
    await signIn({ email, password }, { callbackUrl: from.value })
    showSuccess(`User ${email} successfully logged in`)
  } catch (e) {
    console.error(e)
    loginFailed.value = true
  } finally {
    pending.value = false
  }
}

onBeforeRouteLeave(() => {
  loginRedirect.$reset()
})
</script>

<template>
  <v-card data-testid="login-data-card" width="400px">
    <v-progress-linear
      color="primary"
      :active="pending"
      :indeterminate="true"
    />
    <v-card-title class="text-secondary">Login</v-card-title>
    <v-card-text
      >Enter your credentials
      <span v-if="loginFailed" class="text-error font-weight-bold"
        >Login failed!</span
      >
    </v-card-text>
    <v-form class="px-6" @submit.prevent>
      <v-text-field v-model="email" label="e-mail" />
      <v-text-field v-model="password" type="password" label="password" />
    </v-form>
    <v-card-actions>
      <v-btn color="anchor" :disabled="pending" @click="router.replace('/')">
        cancel
      </v-btn>
      <v-spacer />
      <v-btn
        color="secondary"
        :disabled
        @click="signInAndFeedback({ email, password })"
        >login
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
