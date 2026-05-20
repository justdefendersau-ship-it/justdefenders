/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/autonomousExpeditionCommerce.ts

   Timestamp:
   13 May 2026 07:00 (Sydney)

   PURPOSE:
   Autonomous expedition commerce contract
===================================================== */

export interface AutonomousExpeditionCommerceContract {

  commerceId:string

  expeditionRegion:string

  requestedComponent:string

  commerceState?:

    | "optimising"
    | "routing"
    | "fulfilled"
    | "critical"

  urgencyLevel?:number

  fulfilmentProbability?:number

  supplierConfidence?:number

  estimatedDeliveryHours?:number

  aiCommerceConfidence?:number

  commerceThreats?:string[]

  autonomousActions?:string[]

  substitutionOptions?:string[]

  neuralForecasts?:string[]

  synchronisedAt?:string
}
