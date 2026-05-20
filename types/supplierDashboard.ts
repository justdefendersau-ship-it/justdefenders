// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\types\supplierDashboard.ts
// Timestamp: 15 May 2026 22:05 Sydney
// ====================================================================

export interface SupplierOperationalProfile {

  id: string

  supplierName: string

  region: string

  operationalStatus:
    | "healthy"
    | "warning"
    | "critical"

  reliabilityScore: number

  expeditionSupport: boolean

  activeParts: number

  averageResponseTime: string
}