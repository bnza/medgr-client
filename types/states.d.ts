export interface AppSnackbarState {
  color: 'info' | 'success' | 'warning' | 'error'
  multiline: boolean
  text: string
  timeout: number
  visible: boolean
  vertical: boolean
}
