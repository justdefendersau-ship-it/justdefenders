/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/oemReference.ts

   Timestamp:
   11 May 2026 11:55 (Sydney)

   PURPOSE:
   OEM equivalence and supersession contract
===================================================== */

export interface OEMReferenceContract {

  oemPartNumber: string

  equivalentPartNumbers: string[]

  manufacturer?: string

  compatibilityConfidence?: number
}
