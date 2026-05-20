// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\services\vehicle\vehicleDataService.ts
// Timestamp: 14 May 2026 23:30 Sydney
// ====================================================================

import {
  executeSupabaseOperation
} from "../supabase/baseSupabaseService"

export interface VehicleRecord {

  id?: string

  vin: string

  model?: string

  engine?: string

  year?: number
}

export async function fetchVehicleByVin(
  vin: string
): Promise<VehicleRecord | null> {

  return executeSupabaseOperation(
    "vehicle-data-service",

    async client => {

      const result =
        await client
          .from(
            "vehicles"
          )
          .select("*")
          .eq(
            "vin",
            vin
          )
          .single()

      if (
        result.error
      ) {

        return null
      }

      return result.data as
        VehicleRecord
    }
  )
}

export async function fetchVehicles():
Promise<VehicleRecord[]> {

  const result =
    await executeSupabaseOperation(
      "vehicle-data-service",

      async client => {

        const response =
          await client
            .from(
              "vehicles"
            )
            .select("*")

        if (
          response.error
        ) {

          return []
        }

        return response.data as
          VehicleRecord[]
      }
    )

  return result ?? []
}