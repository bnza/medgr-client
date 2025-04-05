<script setup lang="ts">
import { ApiRole } from '~/utils'

const { data } = useAuth()
const tab = ref('data')

const role = computed(() =>
  data.value ? reduceAppRoles(data.value.roles) : ApiRole.User,
)
</script>

<template>
  <resource-not-found
    v-if="!data"
    path="/"
    :error="new Error('Unauthenticated user')"
  />
  <lazy-data-card v-else title="Current user:" :code="data.email">
    <template #toolbar-append>
      <user-password-dialog-open-button size="small" mode="change" />
    </template>
    <template #default>
      <user-password-dialog :item="data" mode="change" />
      <v-tabs
        v-model="tab"
        color="anchor"
        :bg-color="DATA_API_ACTIONS_BAR_COLOR['read']"
      >
        <v-tab value="data">data</v-tab>
        <v-tab value="sus">sites privileges</v-tab>
      </v-tabs>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="data" data-testid="tabs-item-data">
          <v-form readonly>
            <v-container>
              <v-row no-gutters>
                <v-col class="px-2">
                  <v-text-field v-model="data.email" label="email" />
                </v-col>
                <v-col data-cy="roles-input-col">
                  <v-radio-group v-model="role">
                    <v-radio
                      label="ROLE_ADMIN"
                      color="error"
                      value="ROLE_ADMIN"
                    />
                    <v-radio
                      label="ROLE_EDITOR"
                      color="warning"
                      value="ROLE_EDITOR"
                    />
                    <v-radio
                      label="ROLE_USER"
                      color="success"
                      value="ROLE_USER"
                    />
                  </v-radio-group>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-tabs-window-item>
        <v-tabs-window-item value="sus" data-testid="tabs-item-sus">
          <p>privileges</p>
        </v-tabs-window-item>
      </v-tabs-window>
    </template>
  </lazy-data-card>
</template>
