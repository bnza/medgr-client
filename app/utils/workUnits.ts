import type { ApiResourceWorkUnit, ApiWorkUnitStatus } from '~~/types'

const StatusValues = {
  IDLE: 0,
  RUNNING: 1 << 0,
  SUCCESS: 1 << 1,
  CANCELLED: 1 << 2,
  ERROR: 1 << 3,
} as const

type StatusValue = (typeof StatusValues)[keyof typeof StatusValues]
export type StatusText = Lowercase<
  Exclude<keyof typeof StatusValues, 'CANCELLED'>
>

type StatusCheckArgumentValue = ApiResourceWorkUnit | ApiWorkUnitStatus | number

const isApiWorkUnitStatus = (value: unknown): value is ApiWorkUnitStatus =>
  isLiteralObject(value) && 'value' in value && typeof value.value === 'number'
const isApiResourceWorkUnit = (value: unknown): value is ApiResourceWorkUnit =>
  isLiteralObject(value) &&
  'status' in value &&
  isApiWorkUnitStatus(value.status)
function is(value: StatusCheckArgumentValue, bitmask: StatusValue): boolean {
  if (isApiResourceWorkUnit(value)) {
    return is(value.status.value, bitmask)
  }
  if (isApiWorkUnitStatus(value)) {
    return is(value.value, bitmask)
  }
  return (value & bitmask) !== 0
}

export function isIdle(value: StatusCheckArgumentValue) {
  if (isApiResourceWorkUnit(value)) {
    return isIdle(value.status.value)
  }
  if (isApiWorkUnitStatus(value)) {
    return isIdle(value.value)
  }
  return value === StatusValues.IDLE
}
export function isRunning(value: StatusCheckArgumentValue) {
  return is(value, StatusValues.RUNNING)
}
export function isSuccess(value: StatusCheckArgumentValue) {
  return is(value, StatusValues.SUCCESS)
}
export function isError(value: StatusCheckArgumentValue) {
  return is(value, StatusValues.ERROR)
}

export function isCancelled(value: StatusCheckArgumentValue) {
  return is(value, StatusValues.CANCELLED)
}
export function isTerminated(value: StatusCheckArgumentValue) {
  return !isIdle(value) && !isRunning(value)
}

export function statusToColor(
  value: StatusCheckArgumentValue,
): string | undefined {
  if (isSuccess(value)) {
    return 'success'
  } else if (isError(value)) {
    return 'error'
  } else if (isRunning(value)) {
    return 'warning'
  }
  return
}

export function statusToIcon(value: StatusCheckArgumentValue): string {
  if (isSuccess(value)) {
    return 'fas fa-circle-check'
  } else if (isError(value)) {
    return 'fas fa-circle-exclamation'
  } else if (isRunning(value)) {
    return 'fas fa-circle-xmark'
  }
  return 'fas fa-circle'
}

export function statusToText(value: StatusCheckArgumentValue): StatusText {
  if (isSuccess(value)) {
    return 'success'
  } else if (isError(value)) {
    return 'error'
  } else if (isRunning(value)) {
    return 'running'
  }
  return 'idle'
}
