import type {
  ApiVocabularyItem,
  ApiVocabularyResourceKey,
  JsonLdResourceCollection,
  JsonLdResourceItem,
} from '~~/types'
import { vocabularies } from '~/utils/resources'

type VocabulariesMap = Record<
  ApiVocabularyResourceKey,
  Record<string, JsonLdResourceItem<ApiVocabularyItem>>
>
export default defineStore('api-vocabularies', () => {
  const state = ref<VocabulariesMap | undefined>()

  const { index } = useApiResourcesIndexStore()
  const api = useNuxtApp().$api
  const fetch = async () => {
    if (!index) {
      throw new Error('No API index found')
    }
    const vocabulariesUrlMap = Object.entries(index).filter(
      ([key, _]) => key in vocabularies,
    )
    state.value = await Promise.all(
      vocabulariesUrlMap.map(([key, path]) =>
        api
          .fetch<JsonLdResourceCollection<ApiVocabularyItem>>(path, {
            method: 'get',
          })
          .then((results) => [
            key,
            Object.fromEntries(
              results['hydra:member'].map((item) => [item['@id'], item]),
            ),
          ]),
      ),
    ).then((results) => Object.fromEntries(results))
  }

  const getVocabulary = (key: ApiVocabularyResourceKey) => {
    if (!state.value) {
      throw new Error('Vocabularies not loaded')
    }
    return state.value[key]
  }

  return { vocabularies: readonly(state), fetch, getVocabulary }
})
