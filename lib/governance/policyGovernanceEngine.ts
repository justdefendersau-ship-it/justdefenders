// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\governance\policyGovernanceEngine.ts
// Timestamp: 15 May 2026 10:00 Sydney
// ====================================================================

import {
  GovernancePolicy
} from "./policyGovernanceTypes"

import {
  persistAuditEvent
} from "../audit/auditPersistence"

const governancePolicies:
GovernancePolicy[] = [

  {
    id:
      "policy-runtime-001",

    name:
      "Runtime Protection",

    description:
      "Protect enterprise runtime operations",

    level:
      "critical",

    enabled:
      true,

    createdAt:
      new Date()
        .toISOString()
  },

  {
    id:
      "policy-ai-001",

    name:
      "AI Governance",

    description:
      "Govern AI orchestration execution",

    level:
      "restricted",

    enabled:
      true,

    createdAt:
      new Date()
        .toISOString()
  }
]

export function getGovernancePolicies():
GovernancePolicy[] {

  persistAuditEvent(

    "policy-governance",

    "policies-accessed",

    "info"
  )

  return governancePolicies
}

export function validatePolicyAccess(
  policyId: string
): boolean {

  const policy =
    governancePolicies.find(
      item =>
        item.id === policyId
    )

  const allowed =
    Boolean(
      policy?.enabled
    )

  persistAuditEvent(

    "policy-governance",

    "policy-validation",

    allowed
      ? "info"
      : "warning",

    {

      policyId,

      allowed
    }
  )

  return allowed
}