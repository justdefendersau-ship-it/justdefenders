/**
 * ============================================================
 * JustDefenders©
 *
 * File:
 * C:\dev\justdefenders\frontend\lib\garage\GarageMapper.ts
 *
 * Timestamp:
 * 26 June 2026 15:55 Sydney
 *
 * PURPOSE:
 * Canonical Garage Digital Twin Mapper.
 *
 * M3.5.4
 * Sprint 1 – Mapping Layer
 *
 * CHANGE SUMMARY
 * ------------------------------------------------------------
 * Converts a DigitalTwin into the lightweight
 * GarageVehicleSummary consumed by the Garage UI.
 *
 * This mapper deliberately isolates the presentation layer
 * from the underlying Digital Twin business model.
 *
 * ============================================================
 */

import type {

    DigitalTwin,
    GarageVehicleSummary

} from "@/lib/domain/vehicle"

/**
 * Maps a Digital Twin into a Garage summary suitable for
 * presentation within the Garage dashboard.
 */
export function mapDigitalTwinToGarageSummary(

    digitalTwin: DigitalTwin,

    selectedVin?: string

): GarageVehicleSummary {

    return {

        id:
            digitalTwin.id,

        vin:
            digitalTwin.identity.vin,

        displayName:
            digitalTwin.identity.displayName,

        model:
            digitalTwin.identity.model,

        year:
           digitalTwin.identity.year ?? 0,

        engine:
            digitalTwin.configuration.currentEngine,

        status:
            digitalTwin.operational.status,

        readiness:
            digitalTwin.operational.readiness,

        expeditionReadiness:
            digitalTwin.operational.expeditionReadiness,

        survivability:
            digitalTwin.operational.survivability,

        nextServiceKm:
            digitalTwin.operational.nextServiceKm,

        fuelRangeKm:
            digitalTwin.operational.fuelRangeKm,

        healthScore:
            digitalTwin.intelligence.healthScore,

        selected:
            digitalTwin.identity.vin === selectedVin

    }

}
