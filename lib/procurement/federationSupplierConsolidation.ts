/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\lib\procurement\federationSupplierConsolidation.ts
 *
 * Timestamp:
 * 23 May 2026 15:25 Sydney
 * ============================================================
 *
 * PURPOSE:
 * Consolidate internal and external supplier intelligence
 * into a unified operational supplier dataset.
 *
 * STRATEGY:
 * - Merge internal and federated supplier data
 * - Aggregate operational metrics
 * - Normalize supplier telemetry and procurement scores
 * - Enable responsive dark-themed layout for dashboard
 *
 * IMPORTANT:
 * - Must be used in conjunction with ProcurementProvider
 * - Ensure federation events are properly timestamped
 * ============================================================
 */

import { TacticalSupplier } from "@/lib/procurement/buildSupplierTable"
import { FederationEvent } from "@/lib/federation/federationEngine"

interface ConsolidatedSupplier extends TacticalSupplier {
  federationHealth: "HEALTHY" | "DEGRADED" | "OFFLINE"
  lastUpdated: string
  federationLatencyMs: number
  telemetryScore: number
}

// ============================================================
// CONSOLIDATION FUNCTION
// ============================================================

/**
 * Merge and normalize supplier data from internal and federated sources
 */
export function consolidateFederationSuppliers(

  internalSuppliers: TacticalSupplier[],

  federationEvents: FederationEvent[]

): any {

  const supplierMap = new Map<string, ConsolidatedSupplier>()

  // ------------------------------------------------------------
  // Process internal suppliers
  // ------------------------------------------------------------
  for (const s of internalSuppliers) {
    supplierMap.set(s.supplierName, {
      ...s,
      federationHealth: "HEALTHY",
      lastUpdated: new Date().toISOString(),
      federationLatencyMs: 0,
telemetryScore: 0
    })
  }

  // ------------------------------------------------------------
  // Overlay federation data
  // ------------------------------------------------------------
  for (const event of federationEvents) {
    const existing = supplierMap.get(event.supplierName)

    if (existing) {
      existing.federationHealth = event.health
      existing.federationLatencyMs = event.latencyMs
      existing.lastUpdated = event.timestamp
    } else {

      supplierMap.set(

        event.supplierName,

        {

          supplierName:
            event.supplierName,

          location:
            "Federated Supplier",

          operationalStock:
            false,

          expeditionReady:
            false,

          verifiedSupplier:
            true,

          procurementScore:
            0,

          federationPrice:
            0,

          products:
            [],

          federationHealth:
            event.health,

          lastUpdated:
            event.timestamp,

          federationLatencyMs:
            event.latencyMs,

          telemetryScore:
            100,

          federationStatus:
            "ACTIVE",

          confidence:
            "85",

          supplierType:
            "FEDERATED",

          dispatchEstimate:
            "3-5 days",

          stockRegion:
            "AU",

          supplierTier:
            "FEDERATED",

          procurementVelocity:
            "NORMAL"

        }
      )
    }
  }
  // ------------------------------------------------------------
  // Normalize telemetry scores
  // ------------------------------------------------------------
  for (const supplier of supplierMap.values()) {
    supplier.telemetryScore = computeTelemetryScore(supplier)
  }

  // ------------------------------------------------------------
  // Sort by combined procurement score + telemetry
  // ------------------------------------------------------------
  const consolidated = Array.from(supplierMap.values())
  consolidated.sort((a, b) =>
    (b.procurementScore + b.telemetryScore) -
    (a.procurementScore + a.telemetryScore)
  )

  return consolidated
}

// ============================================================
// TELEMETRY SCORING FUNCTION
// ============================================================

function computeTelemetryScore(supplier: ConsolidatedSupplier): number {
  // Simple normalization example: healthy suppliers get 100, degraded 50, offline 0
  const healthScore = supplier.federationHealth === "HEALTHY" ? 100 :
    supplier.federationHealth === "DEGRADED" ? 50 : 0

  // Penalize by latency: higher latency reduces score
  const latencyPenalty = Math.min(supplier.federationLatencyMs / 10, 50)

  return Math.max(healthScore - latencyPenalty, 0)
}