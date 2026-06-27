```typescript
/**
 * ============================================================
 * JustDefenders©
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
 * Sprint 2 – Mapping Layer
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

import {

    mapDigitalTwinToGarageSummary

} from "./GarageMapper"

export interface GarageViewModel {

    vehicles: GarageVehicleSummary[]

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

    return {

        vehicles,

        selectedVehicle:

            vehicles.find(

                vehicle =>

                    vehicle.selected

            )

    }

}
```
