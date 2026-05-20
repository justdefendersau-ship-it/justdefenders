/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/expeditionIntelligenceMarketplace.ts

   Timestamp:
   13 May 2026 10:00 (Sydney)

   PURPOSE:
   Expedition intelligence marketplace contract
===================================================== */

export interface ExpeditionIntelligenceMarketplaceContract {

  marketplaceId:string

  intelligenceTitle:string

  intelligenceCategory:string

  marketplaceState?:

    | "published"
    | "trending"
    | "premium"
    | "critical"

  activeSubscribers?:number

  survivabilityValue?:number

  aiRelevanceScore?:number

  supplierConfidence?:number

  intelligenceThreats?:string[]

  autonomousInsights?:string[]

  monetisationChannels?:string[]

  neuralForecasts?:string[]

  synchronisedAt?:string
}
