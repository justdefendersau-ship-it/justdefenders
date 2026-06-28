/**
 * ============================================================
 * JustDefenders©
 *
 * File:
 * C:\dev\justdefenders\frontend\lib\domain\vehicle\FleetSummary.ts
 *
 * Timestamp:
 * 28 June 2026 13:45 Sydney
 *
 * PURPOSE:
 * Canonical Fleet Summary domain model.
 *
 * M3.9.8.2
 * Fleet Operational Intelligence
 *
 * CHANGE SUMMARY
 * ------------------------------------------------------------
 * Represents aggregated operational intelligence for the
 * current fleet.
 *
 * This model intentionally contains fleet-level information
 * only and must never contain individual vehicle details.
 *
 * ============================================================
 */

export interface FleetSummary {

    /**
     * Number of active vehicles.
     */
    vehicleCount: number

    /**
     * Average fleet readiness.
     */
    averageReadiness: number

    /**
     * Average expedition readiness.
     */
    averageExpeditionReadiness: number

    /**
     * Average survivability score.
     */
    averageSurvivability: number

    /**
     * Number of vehicles requiring maintenance attention.
     */
    maintenanceAttentionCount: number

    /**
     * Overall fleet operational state.
     */
    operationalStatus:
        | "GREEN"
        | "AMBER"
        | "RED"

}