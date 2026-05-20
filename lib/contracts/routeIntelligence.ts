/* =====================================================
   JustDefenders ©
   Route Intelligence Contract
===================================================== */

export interface RouteIntelligenceContract {

  id: string

  routeName: string

  region: string

  difficulty:

    | "moderate"
    | "hard"
    | "extreme"

  remotenessScore: number

  environmentalHazards: string[]

  commonFailures: string[]

  requiredPreparation: string[]

  minimumFuelRange?: number

  recommendedWaterLitres?: number

  communicationsRequired?: string[]

  recoveryRequirements?: string[]

  seasonalWarnings?: string[]

  tyreRisk?: number

  heatStress?: number

  waterCrossingRisk?: number

  corrugationSeverity?: number

  isolationRisk?: number
}
