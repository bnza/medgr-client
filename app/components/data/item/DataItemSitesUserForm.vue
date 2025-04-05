<script setup lang="ts">
import type {
  ApiAction,
  ApiResourceSitesUser,
  ApiSubmitResourceSitesUser,
  ResourceCollectionParent,
  ResourceConfig,
} from '~~/types'
import useResourceItemForm from '~/composables/useResourceItemForm'
import type ResourceRepository from '~/utils/repository/ResourceRepository'
import useSitesUserValidation from '~/composables/validation/useSitesUserValidation'
import { isApiLdResourceItem } from '~/utils/guards'
import useResourceItemNormalizeSubmit from '~/composables/useResourceItemNormalizeSubmit'

const props = defineProps<{
  mode: ApiAction
  item: ApiResourceSitesUser
  repository: ResourceRepository<ApiResourceSitesUser>
  resourceConfig: ResourceConfig
  parent?: ResourceCollectionParent
}>()

const { readonly, state } = useResourceItemForm<ApiResourceSitesUser>(
  props.mode,
  props.item,
)
if (props.mode === 'create' && props.parent) {
  Object.assign(state, Object.fromEntries([props.parent]))
}
const getRules = readonly.value
  ? (_: string) => undefined
  : useSitesUserValidation(props.item)
const isSiteEditor = computed({
  get() {
    return hasSitePrivilege(state.privileges, ApiSiteRole.Editor)
  },
  set(flag) {
    state.privileges = assignSitePrivilege(
      flag,
      state.privileges,
      ApiSiteRole.Editor,
    )
  },
})
const normalizePost = (item: Partial<ApiResourceSitesUser>) => {
  const submitItem: ApiSubmitResourceSitesUser = {
    ...clone(item),
    site: undefined,
    user: undefined,
  }
  if (isApiLdResourceItem(item?.site)) {
    submitItem.site = item.site['@id']
  }
  if (isApiLdResourceItem(item?.user)) {
    submitItem.user = item.user['@id']
  }
  if (submitItem?.privileges) {
    submitItem.privileges = Number(submitItem.privileges)
  }
  return submitItem
}
useResourceItemNormalizeSubmit(props.mode, props.item, state, normalizePost)
</script>

<template>
  <lazy-data-item-form :item :mode :readonly :repository :resource-config>
    <v-row>
      <v-col cols="12" xs="6" sm="4" class="px-2">
        <api-resource-site-autocomplete
          v-model="state.site"
          :disabled="mode === 'update' || 'site' === parent?.[0]"
          :validation-value="state"
          :rules="getRules('site')"
        />
      </v-col>
      <v-col cols="12" xs="6" sm="4" class="px-2">
        <api-resource-autocomplete
          v-model="state.user"
          :disabled="mode === 'update' || 'user' === parent?.[0]"
          path="users"
          label="user"
          :validation-value="state"
          item-value="@id"
          item-title="email"
          :rules="getRules('user')"
        />
      </v-col>
      <v-col cols="12" xs="12" sm="4" class="px-4">
        <v-checkbox
          v-model="isSiteEditor"
          data-testid="privileges-checkbox"
          :label="getSitePrivilegeKey(state.privileges)"
          :color="getSitePrivilegeColor(state.privileges)"
          :hint="
            ['read', 'delete'].includes(mode) ? '' : 'Click to change role'
          "
          :persistent-hint="['update', 'create'].includes(mode)"
        />
      </v-col>
    </v-row>
  </lazy-data-item-form>
</template>
