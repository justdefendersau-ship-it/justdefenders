/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/autonomousRecoveryCoordination.ts

   Timestamp:
   13 May 2026 04:00 (Sydney)

   PURPOSE:
   Autonomous recovery coordination contract
===================================================== */

export interface AutonomousRecoveryCoordinationContract {

  recoveryId:string

  incidentType:string

  operationalRegion:string

  recoveryState?:

    | "monitoring"
    | "deploying"
    | "active"
    | "critical"

  affectedVehicles?:number

  survivabilityRisk?:number

  extractionProbability?:number

  recoveryEtaHours?:number

  aiCoordinationConfidence?:number

  recoveryThreats?:string[]

  autonomousActions?:string[]

  deployedAssets?:string[]

  neuralForecasts?:string[]

  synchronisedAt?:string
}
