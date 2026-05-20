/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/autonomousExpeditionEconomy.ts

   Timestamp:
   13 May 2026 15:15 (Sydney)

   PURPOSE:
   Autonomous expedition economy contract
===================================================== */

export interface AutonomousExpeditionEconomyContract {

  economyId:string

  economySector:string

  economyState?:

    | "balancing"
    | "optimising"
    | "expanding"
    | "critical"

  activeTradeStreams?:number

  supplierSynchronisation?:number

  expeditionDemandIndex?:number

  aiEconomicConfidence?:number

  marketThreats?:string[]

  autonomousMarketActions?:string[]

  optimisationPatterns?:string[]

  neuralForecasts?:string[]

  synchronisedAt?:string
}
