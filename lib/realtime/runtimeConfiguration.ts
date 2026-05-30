// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\lib\runtime\runtimeConfiguration.ts
//
// Timestamp:
// 27 May 2026 20:35 Sydney
//
// PURPOSE:
// Runtime environment configuration layer.
// ====================================================================

// ====================================================================
// CONFIG
// ====================================================================

export const RuntimeConfiguration = {

  // ================================================================
  // ENVIRONMENT
  // ================================================================

  environment:

    process.env.NODE_ENV ||

    "development",

  // ================================================================
  // SAFE MODE
  // ================================================================

  safeMode:

    process.env
      .JD_SAFE_MODE ===
      "true",

  // ================================================================
  // TELEMETRY
  // ================================================================

  telemetryEnabled:

    process.env
      .JD_ENABLE_TELEMETRY ===
      "true",

  realELM327Enabled:

    process.env
      .JD_ENABLE_REAL_ELM327 ===
      "true",

  // ================================================================
  // NOTIFICATIONS
  // ================================================================

  notificationsEnabled:

    process.env
      .JD_ENABLE_NOTIFICATIONS ===
      "true",

  // ================================================================
  // ANOMALIES
  // ================================================================

  anomalyDetectionEnabled:

    process.env
      .JD_ENABLE_ANOMALY_DETECTION ===
      "true",

  // ================================================================
  // PREDICTIVE
  // ================================================================

  predictiveEngineEnabled:

    process.env
      .JD_ENABLE_PREDICTIVE_ENGINE ===
      "true",

  // ================================================================
  // ADAPTIVE
  // ================================================================

  adaptiveIntelligenceEnabled:

    process.env
      .JD_ENABLE_ADAPTIVE_INTELLIGENCE ===
      "true",

  // ================================================================
  // DEBUG
  // ================================================================

  debugLogging:

    process.env
      .JD_DEBUG_LOGGING ===
      "true"
}