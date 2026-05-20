/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/autonomousFleetEvolution.ts

   Timestamp:
   13 May 2026 12:15 (Sydney)

   PURPOSE:
   Autonomous fleet evolution contract
===================================================== */

export interface AutonomousFleetEvolutionContract {

  evolutionId:string

  fleetPlatform:string

  evolutionState?:

    | "learning"
    | "optimising"
    | "mutating"
    | "critical"

  optimisationGenerations?:number

  survivabilityGain?:number

  adaptationRate?:number

  aiEvolutionConfidence?:number

  evolutionThreats?:string[]

  autonomousUpgrades?:string[]

  mutationPatterns?:string[]

  neuralForecasts?:string[]

  synchronisedAt?:string
}
