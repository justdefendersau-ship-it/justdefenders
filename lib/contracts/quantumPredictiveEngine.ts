/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/quantumPredictiveEngine.ts

   Timestamp:
   13 May 2026 14:30 (Sydney)

   PURPOSE:
   Quantum predictive engine contract
===================================================== */

export interface QuantumPredictiveEngineContract {

  quantumId:string

  expeditionScenario:string

  quantumState?:

    | "probabilistic"
    | "branching"
    | "optimising"
    | "critical"

  activePredictionMatrices?:number

  survivabilityProbability?:number

  branchComplexity?:number

  dimensionalForecastDepth?:number

  quantumConfidence?:number

  predictionEvents?:string[]

  autonomousPredictions?:string[]

  dimensionalPatterns?:string[]

  neuralForecasts?:string[]

  synchronisedAt?:string
}
