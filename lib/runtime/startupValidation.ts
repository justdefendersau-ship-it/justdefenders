// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\runtime\startupValidation.ts
// Timestamp: 15 May 2026 00:10 Sydney
// ====================================================================

import {
  auditEnvironment
} from "../config/environmentGovernance"

import {
  logInfo,
  logWarning,
  logCritical
} from "../logging/runtimeLogger"

let startupValidated =
false

export function validatePlatformStartup() {

  if (startupValidated) {

    return
  }

  startupValidated =
    true

  const audit =
    auditEnvironment()

  if (audit.valid) {

    logInfo(
      "startup-validation",
      "Environment validation passed",
      audit.summary
    )

    return
  }

  logCritical(
    "startup-validation",
    "Critical environment validation failure",
    {

      critical:
        audit.critical,

      warnings:
        audit.warnings
    }
  )

  if (
    audit.warnings.length > 0
  ) {

    logWarning(
      "startup-validation",
      "Environment warnings detected",
      audit.warnings
    )
  }
}