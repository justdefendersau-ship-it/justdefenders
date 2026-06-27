```typescript
/**
 * ============================================================
 * JustDefenders©
 *
 * File:
 * C:\dev\justdefenders\frontend\lib\domain\vehicle\VehicleIntelligence.ts
 *
 * Timestamp:
 * 26 June 2026 15:00 Sydney
 *
 * PURPOSE:
 * Canonical Vehicle Intelligence domain model.
 *
 * M3.5.3
 * Sprint 1 – Digital Twin Domain Models
 *
 * CHANGE SUMMARY
 * ------------------------------------------------------------
 * Represents derived intelligence generated from the
 * Digital Twin.
 *
 * This model does NOT store raw operational data.
 *
 * Instead it stores analysed knowledge generated from:
 *
 * • Maintenance history
 * • Parts history
 * • Fleet analytics
 * • Supplier intelligence
 * • Reliability modelling
 * • Predictive maintenance
 * • Expedition analysis
 *
 * ============================================================
 */

export interface VehicleIntelligence {

  /**
   * Overall vehicle health score.
   */
  healthScore: number

  /**
   * Reliability score.
   */
  reliabilityScore: number

  /**
   * Overall operational risk.
   */
  operationalRisk: number

  /**
   * Predicted maintenance risk.
   */
  maintenanceRisk: number

  /**
   * Expedition readiness score.
   */
  expeditionScore: number

  /**
   * Predicted failure probability.
   */
  failureProbability: number

  /**
   * Confidence in current predictions.
   */
  predictionConfidence: number

  /**
   * Current supplier recommendation score.
   */
  supplierScore: number

  /**
   * Parts intelligence score.
   */
  partsScore: number

  /**
   * Recommended actions.
   */
  recommendations: string[]

  /**
   * Components currently under observation.
   */
  monitoredComponents: string[]

  /**
   * Known operational risks.
   */
  risks: string[]

  /**
   * Predicted future maintenance events.
   */
  predictedEvents: string[]

  /**
   * AI generated summary.
   */
  summary?: string

  /**
   * Last intelligence refresh timestamp.
   */
  generatedAt?: string

}
```
