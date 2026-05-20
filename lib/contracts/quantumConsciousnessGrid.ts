/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/quantumConsciousnessGrid.ts

   Timestamp:
   14 May 2026 14:30 (Sydney)

   PURPOSE:
   Quantum consciousness grid contract
===================================================== */

export interface QuantumConsciousnessGridContract {

  gridId:string

  gridDomain:string

  gridState?:

    | "synchronising"
    | "harmonising"
    | "autonomous"
    | "critical"

  gridDensity?:number

  cognitionGrid?:number

  survivabilityGrid?:number

  aiGridConfidence?:number

  gridThreats?:string[]

  autonomousGridActions?:string[]

  gridPatterns?:string[]

  neuralForecasts?:string[]

  synchronisedAt?:string
}
