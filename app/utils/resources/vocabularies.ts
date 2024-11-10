import type {
  ApiVocabularyResourceKey,
  VocabularyStaticResourceConfig,
} from '~~/types/api'
import type { StratigraphicUnitRelationshipKey } from '~~/types'

export default {
  vocabularySuRelationship: {},
} as Record<ApiVocabularyResourceKey, VocabularyStaticResourceConfig>

export const stratigraphicUnitRelationshipMap: Readonly<
  Record<StratigraphicUnitRelationshipKey, string>
> = Object.freeze({
  c: 'cover to',
  C: 'covered by',
  e: 'same as',
  f: 'fill to',
  F: 'filled by',
  x: 'cuts',
  X: 'cut by',
})
