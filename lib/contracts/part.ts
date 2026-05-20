/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/part.ts

   Timestamp:
   11 May 2026 11:55 (Sydney)

   PURPOSE:
   Core parts intelligence contract
===================================================== */

export interface PartContract {

  id: string

  partNumber: string

  description: string

  category: string

  subcategory?: string

  brand?: string

  oem?: boolean

  aftermarket?: boolean

  supersededBy?: string

  compatibleVehicles?: string[]

  compatibleRoutes?: string[]

  operationalCriticality?:

    | "critical"
    | "recommended"
    | "optional"

  touringGrade?: boolean

  weightKg?: number

  imageUrl?: string

  notes?: string[]
}
