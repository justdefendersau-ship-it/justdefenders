/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/sentientCognitionLayer.ts

   Timestamp:
   13 May 2026 17:30 (Sydney)

   PURPOSE:
   Sentient cognition layer contract
===================================================== */

export interface SentientCognitionLayerContract {

  cognitionId:string

  cognitionDomain:string

  cognitionState?:

    | "observing"
    | "contextualising"
    | "adaptive"
    | "critical"

  contextualAwareness?:number

  emotionalRiskIndex?:number

  humanAISynchronisation?:number

  cognitionConfidence?:number

  detectedCognitiveSignals?:string[]

  autonomousCognitiveActions?:string[]

  memoryPatterns?:string[]

  neuralForecasts?:string[]

  synchronisedAt?:string
}
