/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/partFitment.ts

   Timestamp:
   11 May 2026 11:55 (Sydney)

   PURPOSE:
   Part fitment intelligence contract
===================================================== */

export interface PartFitmentContract {

  partNumber: string

  compatibleVehicleIds: string[]

  compatibleEngines?: string[]

  compatibleGearboxes?: string[]

  vinRanges?: string[]

  fitmentConfidence?: number

  marketRestrictions?: string[]
}
