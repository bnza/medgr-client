<script setup lang="ts">
import type {
  ApiAction,
  ApiResourceStratigraphicUnit,
  ApiResourceUser,
  ResourceConfig,
} from '~~/types'
import type ResourceRepository from '~/utils/repository/ResourceRepository'
import useUserValidation from '~/composables/validation/useUserValidation'
import useResourceItemForm from '~/composables/useResourceItemForm'
import useResourceItemNormalizeSubmit from '~/composables/useResourceItemNormalizeSubmit'

const props = defineProps<{
  mode: ApiAction
  item: ApiResourceUser
  repository: ResourceRepository<ApiResourceUser>
  resourceConfig: ResourceConfig
}>()

const { readonly, state } = useResourceItemForm<ApiResourceUser>(
  props.mode,
  props.item,
)

if (props.mode === 'create') {
  state.roles = [ApiRole.User]
}

const getRules = readonly.value
  ? (_: string) => undefined
  : useUserValidation(props.item)

const formPlainPassword = ref<string | null>(null)
const normalizePost = (
  item: Partial<ApiResourceStratigraphicUnit> & { plainPassword?: string },
) => {
  item = clone(item)
  if (props.mode === 'create') {
    item.plainPassword = formPlainPassword.value = generatePassword()
  }
  return item
}
const { submitStatus } = useResourceItemNormalizeSubmit(
  props.mode,
  props.item,
  state,
  normalizePost,
)

const { plainPassword } = storeToRefs(useUserPlainPasswordStore())
watch(submitStatus, (status) => {
  if (props.mode === 'create' && status === 'success') {
    plainPassword.value = formPlainPassword.value
  }
})

const role = computed({
  get() {
    return state.roles ? reduceAppRoles(state.roles) : ApiRole.User
  },
  set(value: ApiRole) {
    state.roles = mergeRole(value, state.roles)
  },
})
</script>

<template>
  <lazy-data-item-form :item :mode :readonly :repository :resource-config>
    <v-row no-gutters>
      <v-col class="px-2">
        <v-text-field
          v-model="state.email"
          :class="{ 'text-input-disabled': mode === 'update' }"
          :rules="getRules('email')"
          :disabled="mode === 'update'"
          label="email"
        />
      </v-col>
      <v-col data-cy="roles-input-col">
        <v-radio-group v-model="role">
          <v-radio label="ROLE_ADMIN" color="error" value="ROLE_ADMIN" />
          <v-radio label="ROLE_EDITOR" color="warning" value="ROLE_EDITOR" />
          <v-radio label="ROLE_USER" color="success" value="ROLE_USER" />
        </v-radio-group>
      </v-col>
    </v-row>
  </lazy-data-item-form>
</template>
