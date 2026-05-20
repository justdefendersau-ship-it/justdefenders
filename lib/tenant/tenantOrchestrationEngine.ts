// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\tenant\tenantOrchestrationEngine.ts
// Timestamp: 15 May 2026 11:45 Sydney
// ====================================================================

import {
  TenantProfile
} from "./tenantTypes"

import {
  persistAuditEvent
} from "../audit/auditPersistence"

const tenants:
TenantProfile[] = [

  {
    id:
      "tenant-jd-enterprise",

    name:
      "JustDefenders Enterprise",

    slug:
      "justdefenders-enterprise",

    plan:
      "enterprise",

    active:
      true,

    createdAt:
      new Date()
        .toISOString()
  }
]

export function getTenantProfiles():
TenantProfile[] {

  persistAuditEvent(

    "tenant-orchestration",

    "tenant-profiles-accessed",

    "info"
  )

  return tenants
}

export function resolveTenant(
  slug: string
): TenantProfile | null {

  const tenant =
    tenants.find(
      item =>
        item.slug === slug
    ) ?? null

  persistAuditEvent(

    "tenant-orchestration",

    "tenant-resolved",

    tenant
      ? "info"
      : "warning",

    {

      slug,

      resolved:
        Boolean(tenant)
    }
  )

  return tenant
}