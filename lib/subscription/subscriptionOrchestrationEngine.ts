// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\subscription\subscriptionOrchestrationEngine.ts
// Timestamp: 15 May 2026 12:15 Sydney
// ====================================================================

import {
  TenantSubscription
} from "./subscriptionTypes"

import {
  persistAuditEvent
} from "../audit/auditPersistence"

const subscriptions:
TenantSubscription[] = [

  {
    tenantId:
      "tenant-jd-enterprise",

    plan:
      "enterprise",

    status:
      "active",

    renewalDate:
      new Date(
        Date.now() +
        1000 * 60 * 60 * 24 * 30
      ).toISOString(),

    entitlements: [

      "ai-orchestration",
      "predictive-intelligence",
      "distributed-runtime",
      "operations-dashboard"
    ]
  }
]

export function getSubscriptions():
TenantSubscription[] {

  persistAuditEvent(

    "subscription-engine",

    "subscriptions-accessed",

    "info"
  )

  return subscriptions
}

export function validateEntitlement(
  tenantId: string,
  entitlement: string
): boolean {

  const subscription =
    subscriptions.find(
      item =>
        item.tenantId === tenantId
    )

  const allowed =
    Boolean(
      subscription?.entitlements.includes(
        entitlement
      )
    )

  persistAuditEvent(

    "subscription-engine",

    "entitlement-validation",

    allowed
      ? "info"
      : "warning",

    {

      tenantId,

      entitlement,

      allowed
    }
  )

  return allowed
}