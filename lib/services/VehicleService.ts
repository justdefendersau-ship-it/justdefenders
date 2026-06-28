/**
 * ============================================================
 * JustDefenders©
 *
 * File:
 * C:\dev\justdefenders\frontend\lib\services\VehicleService.ts
 *
 * Timestamp:
 * 27 June 2026 18:45 Sydney
 *
 * PURPOSE:
 * Canonical Vehicle Service.
 *
 * M3.9.5
 * Authenticated Repository Integration
 *
 * CHANGE SUMMARY
 * ------------------------------------------------------------
 * VehicleService now receives its repository through
 * dependency injection.
 *
 * The service is responsible for business operations,
 * while persistence remains the responsibility of the
 * repository.
 *
 * ============================================================
 */

import type {

    DigitalTwin

} from "@/lib/domain/vehicle"

import {

    VehicleRepository

} from "@/lib/repositories/VehicleRepository"

export class VehicleService {

    constructor(

        private readonly repository:
            VehicleRepository

    ) {}

    /**
     * Load all Digital Twins.
     */
    async loadVehicles(): Promise<DigitalTwin[]> {

        return this.repository.loadVehicles()

    }

    /**
     * Load a single Digital Twin.
     */
    async loadVehicle(

        vin: string

    ): Promise<DigitalTwin | undefined> {

        return this.repository.loadVehicle(vin)

    }

    /**
     * Save a Digital Twin.
     */
    async saveVehicle(

        vehicle: DigitalTwin

    ): Promise<void> {

        await this.repository.saveVehicle(

            vehicle

        )

    }

    /**
     * Archive a vehicle.
     */
    async archiveVehicle(

        vin: string

    ): Promise<void> {

        await this.repository.archiveVehicle(

            vin

        )

    }

    /**
     * Refresh a vehicle.
     */
    async refreshVehicle(

        vin: string

    ): Promise<DigitalTwin | undefined> {

        return this.repository.refreshVehicle(

            vin

        )

    }

}