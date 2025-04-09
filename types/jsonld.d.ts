import type { ApiResourceItem } from '~~/types/resources'

interface JsonLdItem extends Record<string, unknown> {
  '@id': string
  '@type': string
}

interface JsonLdDocument extends JsonLdItem {
  '@context': string | Record<string, string>
}

interface JsonLdContext extends Record<string, string> {
  '@vocab': string
}

interface HydraProperty extends JsonLdItem {
  'rdfs:label': string
  domain: string
  range: string
}

interface HydraSupportedProperty extends JsonLdItem {
  '@type': 'hydra:SupportedProperty'
  'hydra:property': HydraProperty
  'hydra:title': string
  'hydra:required': boolean
  'hydra:readable': boolean
  'hydra:writable': boolean
}

interface HydraSupportedOperation extends JsonLdItem {
  '@type': string | Array<string>
  'hydra:method': 'GET' | 'DELETE' | 'POST' | 'PUT' | 'PATCH' | 'OPTIONS'
  'hydra:title': string
  'rdfs:label': string
  returns: string
}

interface HydraSupportedClass extends JsonLdItem {
  'hydra:title': string
  'rdfs:label': string
  'hydra:SupportedProperty': Array<HydraSupportedProperty>
  'hydra:SupportedOperation': Array<HydraSupportedOperation>
}

interface JsonLdApiDocumentation extends JsonLdDocument, JsonLdContext {
  'hydra:title': string
  'hydra:entrypoint': string
  'hydra:supportedClass': Array<HydraSupportedClass>
}

export type JsonLdResourceDocument<T extends ApiResourceItem> = JsonLdDocument &
  T

export type JsonLdResourceItem<T> = JsonLdItem & {
  [K in keyof T]: K extends 'id'
    ? T[K] // ← Leave 'id' as-is (string | number)
    : T[K] extends ApiResourceItem
      ? JsonLdResourceItem<T[K]>
      : T[K] extends (infer U)[]
        ? U extends ApiResourceItem
          ? JsonLdResourceItem<U>[]
          : T[K]
        : T[K]
}
type EmptyJsonLdResourceItem<RT extends ApiResourceItem> = {
  '@id'?: string
  '@type'?: string
  '@context'?: string
} & {
  [K in keyof RT]?: RT[K] extends ApiResourceItem
    ? EmptyJsonLdResourceItem<RT[K]>
    : RT[K] extends (infer U)[]
      ? U extends ApiResourceItem
        ? EmptyJsonLdResourceItem<U>[]
        : RT[K]
      : RT[K]
} & {
  _acl?: {
    canRead?: boolean
    canUpdate?: boolean
    canDelete?: boolean
  }
}
export type JsonLdResourceCollection<T extends ApiResourceItem> =
  JsonLdDocument & {
    totalItems: number
    member: Array<JsonLdResourceItem<T>>
  }

export interface JsonLdConstraintViolations extends JsonLdItem {
  '@context': '/api/contexts/ConstraintViolation'
  '@type': 'ConstraintViolation'
  title: string
  description: string
  violations: Array<{
    propertyPath: string
    message: string
  }>
}
export interface JsonLdHydraError extends JsonLdItem {
  '@context': '/api/contexts/Error'
  '@type': 'hydra:Error'
  'hydra:title': string
  'hydra:description': string
}
