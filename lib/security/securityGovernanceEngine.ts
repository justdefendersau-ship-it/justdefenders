// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\security\securityGovernanceEngine.ts
// Timestamp: 15 May 2026 13:00 Sydney
// ====================================================================

import {
  SecurityPolicy,
  SecurityAccessLevel
} from "./securityGovernanceTypes"

import {
  persistAuditEvent
} from "../audit/auditPersistence"

const policies:
SecurityPolicy[] = [

  {
    id:
      "policy-platform-admin",

    name:
      "Platform Administration",

    accessLevel:
      "platform-owner",

    enabled:
      true,

    createdAt:
      new Date()
        .toISOString()
  },

  {
    id:
      "policy-operations",

    name:
      "Operations Governance",

    accessLevel:
      "operator",

    enabled:
      true,

    createdAt:
      new Date()
        .toISOString()
  }
]

export function getSecurityPolicies():
SecurityPolicy[] {

  persistAuditEvent(

    "security-governance",

    "security-policies-accessed",

    "info"
  )

  return policies
}

export function validateAccessLevel(
  required:
    SecurityAccessLevel,

  provided:
    SecurityAccessLevel
): boolean {

  const hierarchy = {

    "user": 1,
    "operator": 2,
    "administrator": 3,
    "platform-owner": 4
  }

  const allowed =
    hierarchy[provided] >=
    hierarchy[required]

  persistAuditEvent(

    "security-governance",

    "access-validation",

    allowed
      ? "info"
      : "warning",

    {

      required,

      provided,

      allowed
    }
  )

  return allowed
}