/**
 * ============================================================
 * JustDefendersÂ©
 *
 * File:
 * C:\dev\justdefenders\frontend\lib\garage\presentation\GaragePresentationMapper.ts
 *
 * Timestamp:
 * 27 June 2026 12:15 Sydney
 *
 * PURPOSE:
 * Maps canonical Garage view models into the current
 * Garage page presentation model.
 *
 * M3.8.1
 * Sprint 1 â€“ Presentation Adapter
 *
 * ============================================================
 */

import type {

    GarageVehicleSummary

} from "@/lib/domain/vehicle"

export interface GaragePresentationVehicle {

    name: string

    vin: string

    readiness: number

    survivability: number

    expedition: number

    maintenance: string

    nextService: string

    fuelRange: string

}

export function mapGaragePresentation(

    vehicles: GarageVehicleSummary[]

): GaragePresentationVehicle[] {

    return vehicles.map(vehicle => ({

        name:
            vehicle.displayName,

        vin:
            vehicle.vin,

        readiness:
            vehicle.readiness,

        survivability:
            vehicle.survivability,

        expedition:
            vehicle.expeditionReadiness,

        maintenance:
            vehicle.status,

        nextService:
            vehicle.nextServiceKm != null
                ? `${vehicle.nextServiceKm.toLocaleString()}km`
                : "Unknown",

        fuelRange:
            vehicle.fuelRangeKm != null
                ? `${vehicle.fuelRangeKm.toLocaleString()}km`
                : "Unknown"

    }))

}