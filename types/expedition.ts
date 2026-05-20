// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\types\expedition.ts
// Timestamp: 15 May 2026 21:05 Sydney
// ====================================================================

export interface ExpeditionReadiness {

  overallScore: number

  drivetrainReadiness: number

  fuelSystemReadiness: number

  electricalReadiness: number

  coolingSystemReadiness: number

  recoveryReadiness: number

  operationalRisk:
    | "low"
    | "medium"
    | "high"

  recommendations:
    string[]
}