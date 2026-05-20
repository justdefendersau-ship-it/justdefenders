/* =====================================================
   JustDefenders ©
   Operational Intelligence Contract
===================================================== */

export type OperationalSeverity =

  | "critical"
  | "high"
  | "medium"
  | "low"
  | "info"

export type OperationalCategory =

  | "predictive"
  | "readiness"
  | "supplier"
  | "workshop"
  | "recommendation"
  | "touring"
  | "action"

export interface OperationalIntelligenceContract {

  // ===================================================
  // CORE IDENTITY
  // ===================================================

  id: string

  category:
    OperationalCategory

  severity:
    OperationalSeverity

  confidence: number

  // ===================================================
  // DISPLAY
  // ===================================================

  title: string

  summary: string

  operationalImpact: string

  // ===================================================
  // INTELLIGENCE
  // ===================================================

  reasoning: string[]

  recommendations: string[]

  // ===================================================
  // LINKING
  // ===================================================

  linkedParts: string[]

  linkedSuppliers?: string[]

  expeditionRoutes?: string[]

  vehicleCompatibility?: string[]

  // ===================================================
  // OPERATIONAL
  // ===================================================

  estimatedRepairTime?: string

  fieldRepairable?: boolean

  carrySpareRecommended?: boolean

  // ===================================================
  // TRACEABILITY
  // ===================================================

  sources?: string[]

  createdAt?: string
}
