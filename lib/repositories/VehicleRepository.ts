/**
 * ============================================================
 * JustDefenders©
 *
 * File:
 * C:\dev\justdefenders\frontend\lib\repositories\VehicleRepository.ts
 *
 * Timestamp:
 * 27 June 2026 16:30 Sydney
 *
 * PURPOSE:
 * Canonical Vehicle Repository.
 *
 * M3.9.4
 * Production Repository Integration
 *
 * CHANGE SUMMARY
 * ------------------------------------------------------------
 * Retrieves Digital Twins from Supabase.
 *
 * Database rows are mapped into the domain model
 * using VehicleRowMapper.
 *
 * ============================================================
 */

import {
    getSupabaseServerClient
} from "@/lib/supabase/server"

import type {
    DigitalTwin
} from "@/lib/domain/vehicle"

import {
    vehicleRowMapper
} from "./VehicleRowMapper"

export class VehicleRepository {

    async loadVehicles(): Promise<DigitalTwin[]> {

        const supabase =
            getSupabaseServerClient()

        const {

            data,

            error

        } = await supabase

            .from("vehicles")

            .select("*")

        if (error) {

            console.error(

                "VehicleRepository.loadVehicles",

                error

            )

            return []

        }

        return (data ?? []).map(

            row => vehicleRowMapper.map(row)

        )

    }

    async loadVehicle(

        vin: string

    ): Promise<DigitalTwin | undefined> {

        const vehicles =
            await this.loadVehicles()

        return vehicles.find(

            vehicle =>

                vehicle.identity.vin === vin

        )

    }

    async saveVehicle(

        vehicle: DigitalTwin

    ): Promise<void> {

        void vehicle

        throw new Error(

            "saveVehicle() not yet implemented."

        )

    }

    async archiveVehicle(

        vin: string

    ): Promise<void> {

        void vin

        throw new Error(

            "archiveVehicle() not yet implemented."

        )

    }

    async refreshVehicle(

        vin: string

    ): Promise<DigitalTwin | undefined> {

        return this.loadVehicle(vin)

    }

}

export const vehicleRepository =
    new VehicleRepository()