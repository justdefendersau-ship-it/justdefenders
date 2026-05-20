// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\vehicle-intelligence\route.ts
// Timestamp: 14 May 2026 23:20 Sydney

import {

  NextRequest,

  NextResponse

}
from "next/server"

import {

  orchestrateVehicleIntelligence

}
from "../../../lib/unifiedVehicleIntelligence"

interface VehicleIntelligenceRequest {

  vehicle?: string

  mileage?: number

  serviceHistory?: unknown[]
}

export async function POST(
  request: NextRequest
) {

  try {

    const body:
      VehicleIntelligenceRequest =
        await request.json()

    const {
      vehicle,
      mileage,
      serviceHistory
    } = body

    if (!vehicle) {

      return NextResponse.json(
        {

          success: false,

          error:
            "Vehicle is required"
        },

        {
          status: 400
        }
      )
    }

    const intelligence =
      orchestrateVehicleIntelligence(

        vehicle,

        mileage ?? 0,

        serviceHistory ?? []
      )

    return NextResponse.json({

      success: true,

      intelligence
    })

  } catch (err) {

    console.error(
      "Vehicle intelligence failure",
      err
    )

    return NextResponse.json(
      {

        success: false,

        error:
          "Vehicle intelligence processing failed"
      },

      {
        status: 500
      }
    )
  }
}