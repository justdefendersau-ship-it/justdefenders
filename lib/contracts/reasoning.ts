/* =====================================================
   JustDefenders ©
   Reasoning Contract
===================================================== */

export interface ReasoningContract {

  id: string

  category:
    | "supplier"
    | "predictive"
    | "touring"
    | "readiness"

  title: string

  summary: string

  confidence: number

  reasoning: string[]

  contributingFactors: string[]

  evidenceSources: string[]

  recommendedActions: string[]

  relatedParts?: string[]

  relatedVehicles?: string[]

  relatedRoutes?: string[]

  generatedAt: string
}
