// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\federation\supplierFederationTypes.ts
// Timestamp: 15 May 2026 07:45 Sydney
// ====================================================================

export interface SupplierFederationResult {

  supplier: string

  partNumber: string

  description: string

  price: number

  currency: string

  availability: string

  confidence: number
}

export interface SupplierFederationRequest {

  query: string

  vehicle?: string

  vin?: string
}