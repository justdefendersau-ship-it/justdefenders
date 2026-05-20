// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\billing\billingTypes.ts
// Timestamp: 15 May 2026 12:30 Sydney
// ====================================================================

export type BillingStatus =

  | "pending"
  | "paid"
  | "overdue"
  | "cancelled"

export interface BillingInvoice {

  id: string

  tenantId: string

  amount: number

  currency: string

  status: BillingStatus

  issuedAt: string
}