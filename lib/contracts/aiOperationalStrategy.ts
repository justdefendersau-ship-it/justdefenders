/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/aiOperationalStrategy.ts

   Timestamp:
   12 May 2026 09:15 (Sydney)

   PURPOSE:
   AI operational strategy intelligence contract
===================================================== */

export interface AIOperationalStrategyContract {

  strategyId: string

  missionName: string

  expeditionRegion?: string

  strategicState?:

    | "optimised"
    | "adaptive"
    | "escalated"
    | "critical"

  operationalEfficiency?: number

  survivabilityIndex?: number

  logisticsEfficiency?: number

  predictiveRiskReduction?: number

  aiConfidence?: number

  strategicThreats?: string[]

  aiStrategicRecommendations?: string[]

  operationalTradeoffs?: string[]

  commandObjectives?: string[]

  synchronisedAt?: string
}
