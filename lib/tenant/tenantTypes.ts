// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\tenant\tenantTypes.ts
// Timestamp: 15 May 2026 11:45 Sydney
// ====================================================================

export type TenantPlan =

  | "community"
  | "professional"
  | "enterprise"

export interface TenantProfile {

  id: string

  name: string

  slug: string

  plan: TenantPlan

  active: boolean

  createdAt: string
}