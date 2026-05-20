// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\runtime\featureFlags.ts
// Timestamp: 15 May 2026 00:50 Sydney
// ====================================================================

export interface RuntimeFeatureFlags {

  predictiveIntelligence:
    boolean

  supplierFederation:
    boolean

  telemetryIngestion:
    boolean

  realtimeTracking:
    boolean

  aiOrchestration:
    boolean

  enterpriseLogging:
    boolean

  operationalMetrics:
    boolean

  queueProcessing:
    boolean
}

export const runtimeFeatureFlags:
RuntimeFeatureFlags = {

  predictiveIntelligence:
    process.env
      .FEATURE_PREDICTIVE_INTELLIGENCE ===
    "true",

  supplierFederation:
    process.env
      .FEATURE_SUPPLIER_FEDERATION ===
    "true",

  telemetryIngestion:
    process.env
      .FEATURE_TELEMETRY_INGESTION ===
    "true",

  realtimeTracking:
    process.env
      .FEATURE_REALTIME_TRACKING ===
    "true",

  aiOrchestration:
    process.env
      .FEATURE_AI_ORCHESTRATION ===
    "true",

  enterpriseLogging:
    true,

  operationalMetrics:
    true,

  queueProcessing:
    process.env
      .FEATURE_QUEUE_PROCESSING ===
    "true"
}

export function featureEnabled(
  feature:
    keyof RuntimeFeatureFlags
): boolean {

  return Boolean(
    runtimeFeatureFlags[
      feature
    ]
  )
}