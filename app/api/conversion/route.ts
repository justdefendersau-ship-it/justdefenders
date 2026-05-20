// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\conversion\route.ts
// Timestamp: 15 May 2026 01:25 Sydney

import {
  NextRequest,
  NextResponse
} from "next/server"

interface ConversionRequest {

  value?: number

  from?: string

  to?: string
}

const conversionRates:
Record<string, number> = {

  AUD: 1,

  USD: 0.65,

  GBP: 0.52,

  EUR: 0.60
}

export async function POST(
  request: NextRequest
) {

  try {

    /**
     * Environment validation
     * Prevents build-time Supabase failures
     */
    const supabaseUrl =
      process.env
        .NEXT_PUBLIC_SUPABASE_URL

    const supabaseKey =
      process.env
        .NEXT_PUBLIC_SUPABASE_KEY

    /**
     * Safe fallback mode
     */
    if (
      !supabaseUrl ||
      !supabaseKey
    ) {

      return NextResponse.json({

        success: true,

        warning:
          "Supabase environment variables missing",

        convertedValue: 0
      })
    }

    const body:
      ConversionRequest =
        await request.json()

    const {
      value = 0,
      from = "AUD",
      to = "USD"
    } = body

    const fromRate =
      conversionRates[from]

    const toRate =
      conversionRates[to]

    if (
      !fromRate ||
      !toRate
    ) {

      return NextResponse.json(
        {

          success: false,

          error:
            "Unsupported currency"
        },

        {
          status: 400
        }
      )
    }

    const audValue =
      value / fromRate

    const convertedValue =
      audValue * toRate

    return NextResponse.json({

      success: true,

      from,

      to,

      originalValue: value,

      convertedValue:
        Number(
          convertedValue.toFixed(2)
        )
    })

  } catch (err) {

    console.error(
      "Conversion API failure",
      err
    )

    return NextResponse.json(
      {

        success: false,

        error:
          "Conversion failed"
      },

      {
        status: 500
      }
    )
  }
}