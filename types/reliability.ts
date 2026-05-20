// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\types\reliability.ts
// Timestamp: 15 May 2026 20:35 Sydney
// ====================================================================

export interface ReliabilityInsight {

  id: string

  title: string

  severity:
    | "low"
    | "medium"
    | "high"

  category: string

  recommendation: string
}