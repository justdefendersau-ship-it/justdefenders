/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/expeditionOperationalEconomics.ts

   Timestamp:
   12 May 2026 12:15 (Sydney)

   PURPOSE:
   Expedition operational economics intelligence contract
===================================================== */

export interface ExpeditionOperationalEconomicsContract {

  economicsId: string

  expeditionRegion: string

  economicState?:

    | "efficient"
    | "elevated"
    | "critical"
    | "unsustainable"

  projectedFuelCostAud?: number

  projectedRecoveryCostAud?: number

  projectedLogisticsCostAud?: number

  projectedMaintenanceCostAud?: number

  operationalEfficiencyIndex?: number

  survivabilityCostPressure?: number

  financialRiskProbability?: number

  economicThreats?: string[]

  optimisationStrategies?: string[]

  operationalTradeoffs?: string[]

  aiEconomicForecast?: string[]

  synchronisedAt?: string
}
