<script setup lang="ts">
import type { ApiAction, ApiResourceItem, ResourceConfig } from '~~/types'
import type { VForm } from 'vuetify/components'
import type ResourceRepository from '~/utils/repository/ResourceRepository'

const props = defineProps<{
  item: ApiResourceItem
  mode: ApiAction
  readonly: boolean
  repository: ResourceRepository<ApiResourceItem>
  resourceConfig: ResourceConfig
}>()
const { submittingItem, submitStatus } = inject(resourceItemSubmitInjectionKey)
const formRef = useTemplateRef<VForm>('form')

const router = useRouter()
const { showSuccess } = useAppSnackbarStore()
const { to, collection, push } = useAppNavigation(props.mode !== 'read')
watch(submittingItem, async (value) => {
  const form = formRef.value
  let _to: string = props.mode === 'delete' ? collection.value : to.value
  if (value && form) {
    await form.validate()
    if (!form.isValid) {
      return
    }
    submitStatus.value = 'pending'
    try {
      switch (props.mode) {
        case 'create': {
          const response = await props.repository.postItem(value)
          _to = `${props.resourceConfig.appPath}/${response.id}`
          push(to.value)
          break
        }
        case 'delete':
          await props.repository.deleteItem(value)
          break
        case 'update':
          await props.repository.patchItem(
            props.item.id,
            Object.assign({}, value),
          )
          break
      }
      submitStatus.value = 'success'
      showSuccess(`Successfully ${props.mode}d resource`)
      await router.replace(_to)
    } catch (e) {
      console.error(e)
      submitStatus.value = 'error'
    } finally {
      submittingItem.value = undefined
    }
  }
})
onUnmounted(() => {
  submitStatus.value = 'idle'
})
</script>

<template>
  <v-form
    ref="form"
    class="mx-4"
    :readonly
    data-testid="data-item-form"
    @submit.prevent
  >
    <v-container>
      <lazy-data-item-delete-alert v-if="mode === 'delete'" />
      <loading-component v-if="submitStatus === 'success'" />
      <slot v-else />
    </v-container>
  </v-form>
</template>
