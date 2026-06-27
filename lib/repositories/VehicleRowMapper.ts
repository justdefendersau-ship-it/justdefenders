/**
 * ============================================================
 * JustDefenders©
 *
 * File:
 * C:\dev\justdefenders\frontend\lib\repositories\VehicleRowMapper.ts
 *
 * Timestamp:
 * 27 June 2026 16:30 Sydney
 *
 * PURPOSE:
 * Maps Supabase vehicle records into the canonical
 * DigitalTwin domain model.
 *
 * M3.9.4
 * Production Repository Integration
 *
 * ============================================================
 */

import type {
    DigitalTwin
} from "@/lib/domain/vehicle"

export class VehicleRowMapper {

    map(row: any): DigitalTwin {

        return {

            id: row.id,

            identity: {

                id: row.id,

                vin: row.vin,

                displayName:
                    row.name ??
                    row.nickname ??
                    "Unnamed Vehicle",

                model:
                    row.model ?? "",

                year:
                    row.year ?? 0,

                bodyStyle: "DEFENDER",

                factoryEngine:
                    row.engine ?? "Unknown",

                factoryGearbox: "Unknown",

                market: "AU",

                status: "ACTIVE"

            },

            configuration: {

                currentEngine:
                    row.engine ?? "Unknown",

                currentGearbox: "Unknown",

                drivetrain: "4X4",

                accessories: [],

                modifications: []

            },

            operational: {

                odometerKm: 0,

                status: "ACTIVE",

                readiness: 100,

                expeditionReadiness: 100,

                survivability: 100,

                archived: false

            },

            intelligence: {

                healthScore:
                    row.health_score ?? 100,

                reliabilityScore: 100,

                operationalRisk: 0,

                maintenanceRisk: 0,

                expeditionScore: 100,

                failureProbability: 0,

                predictionConfidence: 100,

                supplierScore: 100,

                partsScore: 100,

                recommendations: [],

                monitoredComponents: [],

                risks: [],

                predictedEvents: []

            },

            createdAt:
                row.created_at,

            updatedAt:
                row.created_at,

            schemaVersion: 1

        }

    }

}

export const vehicleRowMapper =
    new VehicleRowMapper()