export * from './api'
export * from './filters'
export * from './globals'
export * from './jsonld'
export * from './resources'
export * from './states'
export type AsyncValidationType = 'unique'
export type Writeable<T> = { -readonly [P in keyof T]: T[P] }
export type UserChangePasswordBody = {
  oldPassword: string
  newPassword: string
  repeatPassword: string
}
export type UiMode = 'default' | 'map'
export type OptionalProp<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>
