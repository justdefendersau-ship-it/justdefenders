// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\auth\authTypes.ts
// Timestamp: 14 May 2026 22:00 Sydney
// ====================================================================

export type RuntimeUserRole =

  | "admin"
  | "member"
  | "supplier"
  | "operator"
  | "guest"

export interface RuntimeAuthToken {

  userId: string

  email: string

  role: RuntimeUserRole

  issuedAt: number

  expiresAt: number
}

export interface RuntimeAuthResult {

  authenticated: boolean

  token: RuntimeAuthToken | null

  error?: string
}