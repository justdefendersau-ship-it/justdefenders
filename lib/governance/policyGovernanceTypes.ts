// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\governance\policyGovernanceTypes.ts
// Timestamp: 15 May 2026 10:00 Sydney
// ====================================================================

export type GovernancePolicyLevel =

  | "standard"
  | "restricted"
  | "critical"

export interface GovernancePolicy {

  id: string

  name: string

  description: string

  level: GovernancePolicyLevel

  enabled: boolean

  createdAt: string
}