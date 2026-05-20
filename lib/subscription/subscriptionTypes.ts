// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\subscription\subscriptionTypes.ts
// Timestamp: 15 May 2026 12:40 Sydney
// ====================================================================

export type SubscriptionStatus =

  | "trial"
  | "active"
  | "suspended"
  | "cancelled"

export interface TenantSubscription {

  tenantId: string

  plan: string

  status: SubscriptionStatus

  renewalDate: string

  entitlements: string[]
}