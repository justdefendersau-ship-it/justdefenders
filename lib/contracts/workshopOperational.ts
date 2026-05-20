/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/workshopOperational.ts

   Timestamp:
   11 May 2026 16:00 (Sydney)

   PURPOSE:
   Workshop operational intelligence contract
===================================================== */

export interface WorkshopOperationalContract {

  id: string

  workshopName: string

  region: string

  specialties: string[]

  defenderExpertise?: boolean

  touringInspection?: boolean

  emergencySupport?: boolean

  mobileSupport?: boolean

  supportedRoutes?: string[]

  operationalConfidence?: number

  leadTimeDays?: number

  recommendedServices?: string[]

  notes?: string[]
}
