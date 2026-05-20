// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\runtime\featureGovernance.ts
// Timestamp: 15 May 2026 00:50 Sydney
// ====================================================================

import {
  featureEnabled,
  runtimeFeatureFlags
} from "./featureFlags"

import {
  logInfo,
  logWarning
} from "../logging/runtimeLogger"

export function validateFeatureAccess(
  feature:
    keyof typeof runtimeFeatureFlags
): boolean {

  const enabled =
    featureEnabled(
      feature
    )

  if (enabled) {

    logInfo(
      "feature-governance",
      "Feature enabled",
      {

        feature
      }
    )

    return true
  }

  logWarning(
    "feature-governance",
    "Feature disabled",
    {

      feature
    }
  )

  return false
}

export function listRuntimeFeatures() {

  return runtimeFeatureFlags
}