/**
 * ============================================================
 * JustDefenders©
 *
 * File:
 * C:\dev\justdefenders\frontend\lib\repositories\VehicleRepository.ts
 *
 * Timestamp:
 * 28 June 2026 08:30 Sydney
 *
 * PURPOSE:
 * Canonical Vehicle Repository.
 *
 * M3.9.5
 * Authenticated Repository Integration
 *
 * CHANGE SUMMARY
 * ------------------------------------------------------------
 * Clean canonical implementation following Wave 5C
 * repository recovery.
 *
 * The repository is responsible only for persistence.
 * Authentication is provided by the caller through the
 * injected Supabase client.
 *
 * Business logic belongs in VehicleService.
 * Mapping belongs in VehicleRowMapper.
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

        private readonly supabase: SupabaseClient

    ) {}

    /**
     * --------------------------------------------------------
     * Load every vehicle visible to the authenticated user.
     * RLS determines which rows are returned.
     * --------------------------------------------------------
     */

    async loadVehicles(): Promise<DigitalTwin[]> {

        const {

            data,

            error

        } = await this.supabase

            .from("vehicles")

            .select("*")

            .order(

                "created_at",

                {

                    ascending: false

                }

            )

        if (error) {

            throw new Error(

                `VehicleRepository.loadVehicles(): ${error.message}`

            )

        }

        return (data ?? []).map(

            row =>

                vehicleRowMapper.map(row)

        )

    }

    /**
     * --------------------------------------------------------
     * Load a single vehicle by VIN.
     * --------------------------------------------------------
     */

    async loadVehicle(

        vin: string

    ): Promise<DigitalTwin | undefined> {

        const {

            data,

            error

        } = await this.supabase

            .from("vehicles")

            .select("*")

            .eq(

                "vin",

                vin

            )

            .maybeSingle()

        if (error) {

            throw new Error(

                `VehicleRepository.loadVehicle(): ${error.message}`

            )

        }

        if (!data) {

            return undefined

        }

        return vehicleRowMapper.map(

            data

        )

    }

    /**
     * --------------------------------------------------------
     * Save a Digital Twin.
     *
     * Sprint 3.
     * --------------------------------------------------------
     */

    async saveVehicle(

        vehicle: DigitalTwin

    ): Promise<void> {

        void vehicle

        throw new Error(

            "VehicleRepository.saveVehicle() not implemented."

        )

    }

    /**
     * --------------------------------------------------------
     * Archive a vehicle.
     *
     * Sprint 3.
     * --------------------------------------------------------
     */

    async archiveVehicle(

        vin: string

    ): Promise<void> {

        void vin

        throw new Error(

            "VehicleRepository.archiveVehicle() not implemented."

        )

    }

    /**
     * --------------------------------------------------------
     * Refresh a Digital Twin.
     * --------------------------------------------------------
     */

    async refreshVehicle(

        vin: string

    ): Promise<DigitalTwin | undefined> {

        return this.loadVehicle(

            vin

        )

    }

}