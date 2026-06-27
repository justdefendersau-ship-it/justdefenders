/**
 * ============================================================
 * JustDefenders©
 *
 * File:
 * C:\dev\justdefenders\frontend\lib\services\VehicleService.ts
 *
 * Timestamp:
 * 27 June 2026 12:45 Sydney
 *
 * PURPOSE:
 * Canonical Vehicle Service.
 *
 * M3.8.3
 * Runtime Service Layer
 *
 * CHANGE SUMMARY
 * ------------------------------------------------------------
 * Defines the canonical service responsible for loading and
 * managing Digital Twins.
 *
 * During Alpha this service will initially return bootstrap
 * data. Later it will delegate to the Vehicle Repository,
 * which will retrieve data from Supabase.
 *
 * ============================================================
 */
import {

    vehicleRepository

} from "@/lib/repositories/VehicleRepository"

import type {

    DigitalTwin

} from "@/lib/domain/vehicle"



export class VehicleService {

    /**
     * Load all Digital Twins.
     */
    async loadVehicles(): Promise<DigitalTwin[]> {

        return vehicleRepository.loadVehicles()

    }

    /**
     * Load a single Digital Twin by VIN.
     */
    async loadVehicle(

        vin: string

    ): Promise<DigitalTwin | undefined> {

        return vehicleRepository.loadVehicle(vin)

    }

    /**
     * Save a Digital Twin.
     */
    async saveVehicle(

        vehicle: DigitalTwin

    ): Promise<void> {

        await vehicleRepository.saveVehicle(vehicle)

    }

    /**
     * Archive a vehicle.
     */
    async archiveVehicle(

        vin: string

    ): Promise<void> {

        await vehicleRepository.archiveVehicle(vin)

    }

    /**
     * Refresh a single Digital Twin.
     */
    async refreshVehicle(

        vin: string

    ): Promise<DigitalTwin | undefined> {

        return vehicleRepository.loadVehicle(vin)

    }

}

/**
 * Canonical singleton instance.
 */
export const vehicleService = new VehicleService()