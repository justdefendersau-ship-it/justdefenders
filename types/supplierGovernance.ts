// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\types\supplierGovernance.ts
// Timestamp: 15 May 2026 15:10 Sydney
// ====================================================================

export type SupplierRegion =

  | "AU"
  | "UK"
  | "EU"
  | "US"
  | "GLOBAL"

export interface SupplierGovernanceProfile {

  supplierId: string

  supplierName: string

  region: SupplierRegion

  preferredOperationalSupplier: boolean

  internationalSupplier: boolean

  expeditionReady: boolean

  verified: boolean
}