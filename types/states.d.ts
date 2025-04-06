export interface AppSnackbarState {
  color: 'info' | 'success' | 'warning' | 'error'
  multiline: boolean
  text: string
  timeout: number
  visible: boolean
  vertical: boolean
}
type PaginationOptionsState = {
  itemsPerPage?: number
  page: number
  search?: string
  groupBy: Array<string>
  sortBy?: Array<{ key: string; order: 'asc' | 'desc' }>
}
