/**
 * ============================================================
 * JustDefenders©
 *
 * File:
 * C:\dev\justdefenders\frontend\lib\repositories\VehicleRepository.ts
 *
 * Timestamp:
 * 27 June 2026 18:30 Sydney
 *
 * PURPOSE:
 * Canonical Vehicle Repository.
 *
 * M3.9.5
 * Authenticated Repository Integration
 *
 * CHANGE SUMMARY
 * ------------------------------------------------------------
 * Repository now receives its Supabase client through
 * dependency injection.
 *
 * This keeps authentication outside the repository and
 * allows the same repository to be used by API routes,
 * services, background jobs and future admin tooling.
 *
 * ============================================================
 */

import type {

    SupabaseClient

} from "@supabase/supabase-js"

import type {

    DigitalTwin

} from "@/lib/domain/vehicle"

import {

    vehicleRowMapper

} from "./VehicleRowMapper"

export class VehicleRepository {

    constructor(

        private readonly supabase:
            SupabaseClient

    ) {}

    async loadVehicles(): Promise<DigitalTwin[]> {
console.log("REPO 1")

const {

    data,

    error

} = await this.supabase

    .from("vehicles")

    .select("*")

console.log("REPO 2")

if (error) {

    console.error(error)

    return []

}

console.log(

    "REPO 3",

    data?.length

)

return (data ?? []).map(

    row =>

        vehicleRowMapper.map(row)

)

        const {

            data,

            error

        } = await this.supabase

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

            row =>

                vehicleRowMapper.map(row)

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

            "saveVehicle() not implemented."

        )

    }

    async archiveVehicle(

        vin: string

    ): Promise<void> {

        void vin

        throw new Error(

            "archiveVehicle() not implemented."

        )

    }

    async refreshVehicle(

        vin: string

    ): Promise<DigitalTwin | undefined> {

        return this.loadVehicle(vin)

    }

}