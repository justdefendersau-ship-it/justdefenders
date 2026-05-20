/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/globalSupplierNeuralFederation.ts

   Timestamp:
   12 May 2026 23:30 (Sydney)

   PURPOSE:
   Global supplier neural federation contract
===================================================== */

export interface GlobalSupplierNeuralFederationContract {

  federationId:string

  supplierName:string

  supplierRegion:string

  supplierState?:

    | "stable"
    | "adaptive"
    | "priority"
    | "collapse-risk"

  aiTrustScore?:number

  inventoryCollapseProbability?:number

  expeditionCriticality?:number

  fulfilmentVelocityHours?:number

  substitutionReadiness?:number

  neuralConfidence?:number

  supplierThreats?:string[]

  autonomousActions?:string[]

  substitutionCandidates?:string[]

  neuralForecasts?:string[]

  synchronisedAt?:string
}
