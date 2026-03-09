// ============================================================================
// Slice State Types
// ============================================================================

export type AuthState = {
  token: string | null
  permissions: unknown | null
}

export type NotificationState = {
  count: number
}

export type TimezoneState = {
  timezone: string
}

export type RootState = {
  auth: AuthState
  notifications: NotificationState
  timezone: TimezoneState
}
