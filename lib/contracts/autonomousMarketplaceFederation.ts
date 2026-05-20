/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/autonomousMarketplaceFederation.ts

   Timestamp:
   12 May 2026 22:45 (Sydney)

   PURPOSE:
   Marketplace intelligence federation contract
===================================================== */

export interface AutonomousMarketplaceFederationContract {

  federationId:string

  supplierName:string

  supplierRegion:string

  federationState?:

    | "connected"
    | "adaptive"
    | "priority"
    | "critical"

  supplierHealthIndex?:number

  inventoryConfidence?:number

  expeditionFulfilmentProbability?:number

  aiRoutingConfidence?:number

  logisticsLatencyHours?:number

  federationThreats?:string[]

  aiRecommendations?:string[]

  liveInventorySignals?:string[]

  synchronisedAt?:string
}
