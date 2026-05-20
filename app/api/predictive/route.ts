// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\predictive\route.ts
// Timestamp: 14 May 2026 22:50 Sydney

import {
  NextRequest,
  NextResponse
} from "next/server"

import {
  generatePredictiveInsights,
  DefenderGeneration
} from "../../../lib/predictiveOwnership"

interface PredictiveRequestBody {

  vehicle?: string

  mileage?: number

  serviceHistory?: unknown[]
}

function resolveGeneration(
  vehicle?: string
): DefenderGeneration {

  if (!vehicle) {

    return "Puma"
  }

  const normalized =
    vehicle.toLowerCase()

  if (
    normalized.includes("td5")
  ) {

    return "TD5"
  }

  if (
    normalized.includes("300tdi")
  ) {

    return "300Tdi"
  }

  return "Puma"
}

export async function POST(
  request: NextRequest
) {

  try {

    const body:
      PredictiveRequestBody =
        await request.json()

    const {
      vehicle,
      mileage
    } = body

    const generation =
      resolveGeneration(
        vehicle
      )

    const insights =
      generatePredictiveInsights({

        generation,

        currentKm:
          mileage ?? 0
      })

    return NextResponse.json({

      success: true,

      vehicle,

      generation,

      insights
    })

  } catch (err) {

    console.error(
      "Predictive API failure",
      err
    )

    return NextResponse.json(
      {

        success: false,

        error:
          "Predictive analysis failed"
      },

      {
        status: 500
      }
    )
  }
}