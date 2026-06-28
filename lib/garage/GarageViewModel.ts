/**
 * ============================================================
 * JustDefendersÂ©
 *
 * File:
 * C:\dev\justdefenders\frontend\lib\garage\GarageViewModel.ts
 *
 * Timestamp:
 * 26 June 2026 16:10 Sydney
 *
 * PURPOSE:
 * Canonical Garage View Model.
 *
 * M3.5.4
 * Sprint 2 â€“ Mapping Layer
 *
 * CHANGE SUMMARY
 * ------------------------------------------------------------
 * Creates the Garage view model consumed by the Garage UI.
 *
 * This class orchestrates collections of Digital Twins and
 * produces lightweight GarageVehicleSummary objects for
 * presentation.
 *
 * ============================================================
 */

import type {

    DigitalTwin,
    GarageVehicleSummary

} from "@/lib/domain/vehicle"

import type {

    FleetSummary

} from "@/lib/domain/vehicle/FleetSummary"


import {

    mapDigitalTwinToGarageSummary

} from "./GarageMapper"

export interface GarageViewModel {

    vehicles: GarageVehicleSummary[]

    fleetSummary: FleetSummary

    selectedVehicle?: GarageVehicleSummary

}

export interface CreateGarageViewModelOptions {

    selectedVin?: string

    includeArchived?: boolean

}

export function createGarageViewModel(

    digitalTwins: DigitalTwin[],

    options: CreateGarageViewModelOptions = {}

): GarageViewModel {

    const {

        selectedVin,

        includeArchived = false

    } = options

    const vehicles = digitalTwins

        .filter(

            twin =>

                includeArchived ||

                !twin.operational.archived

        )

        .map(

            twin =>

                mapDigitalTwinToGarageSummary(

                    twin,

                    selectedVin

                )

        )

        .sort(

            (a, b) =>

                a.displayName.localeCompare(

                    b.displayName

                )

        )

    
const vehicleCount = vehicles.length

const averageReadiness =
    vehicleCount === 0
        ? 0
        : Math.round(
            vehicles.reduce(
                (sum, vehicle) => sum + vehicle.readiness,
                0
            ) / vehicleCount
        )

const averageExpeditionReadiness =
    vehicleCount === 0
        ? 0
        : Math.round(
            vehicles.reduce(
                (sum, vehicle) => sum + vehicle.expeditionReadiness,
                0
            ) / vehicleCount
        )

const averageSurvivability =
    vehicleCount === 0
        ? 0
        : Math.round(
            vehicles.reduce(
                (sum, vehicle) => sum + vehicle.survivability,
                0
            ) / vehicleCount
        )

const maintenanceAttentionCount =
    vehicles.filter(
        vehicle => vehicle.status !== "STABLE"
    ).length

const operationalStatus =
    averageReadiness >= 90
        ? "GREEN"
        : averageReadiness >= 75
            ? "AMBER"
            : "RED"

return {

    vehicles,

    fleetSummary: {

    vehicleCount,

    averageReadiness,

    averageExpeditionReadiness,

    averageSurvivability,

    maintenanceAttentionCount,

    operationalStatus

},

    selectedVehicle:

        vehicles.find(

            vehicle =>

                vehicle.selected

        )

}

}
