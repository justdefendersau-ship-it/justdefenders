// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\lib\runtime\runtimeEnforcementEngine.ts
//
// Timestamp:
// 28 May 2026 03:35 Sydney
//
// PURPOSE:
// Runtime enforcement engine.
// ====================================================================

import {

  loadRuntimeCommandState

}
from "@/lib/runtime/runtimeCommandEngine"

// ====================================================================
// SAFE MODE
// ====================================================================

export function runtimeSafeModeEnabled(){

  return loadRuntimeCommandState()
    .safeMode
}

// ====================================================================
// DEGRADED MODE
// ====================================================================

export function runtimeDegradedModeEnabled(){

  return loadRuntimeCommandState()
    .degradedMode
}

// ====================================================================
// LOCKDOWN
// ====================================================================

export function runtimeLockdownEnabled(){

  return loadRuntimeCommandState()
    .operationalLockdown
}

// ====================================================================
// TELEMETRY
// ====================================================================

export function telemetryRuntimeEnabled(){

  return loadRuntimeCommandState()
    .telemetryEnabled
}

// ====================================================================
// PREDICTIVE
// ====================================================================

export function predictiveRuntimeEnabled(){

  return loadRuntimeCommandState()
    .predictiveRuntime
}

// ====================================================================
// ADVISORY
// ====================================================================

export function advisoryRuntimeEnabled(){

  return loadRuntimeCommandState()
    .advisoryRuntime
}

// ====================================================================
// ANOMALY
// ====================================================================

export function anomalyRuntimeEnabled(){

  return loadRuntimeCommandState()
    .anomalyRuntime
}

// ====================================================================
// NOTIFICATION
// ====================================================================

export function notificationRuntimeEnabled(){

  return loadRuntimeCommandState()
    .notificationRuntime
}