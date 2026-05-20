// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\security\securityGovernanceTypes.ts
// Timestamp: 15 May 2026 13:00 Sydney
// ====================================================================

export type SecurityAccessLevel =

  | "user"
  | "operator"
  | "administrator"
  | "platform-owner"

export interface SecurityPolicy {

  id: string

  name: string

  accessLevel: SecurityAccessLevel

  enabled: boolean

  createdAt: string
}