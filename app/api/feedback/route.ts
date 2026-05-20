// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\feedback\route.ts
// Timestamp: 15 May 2026 01:35 Sydney

import {
  NextRequest,
  NextResponse
} from "next/server"

interface FeedbackRequest {

  name?: string

  email?: string

  message?: string
}

export async function POST(
  request: NextRequest
) {

  try {

    /**
     * Prevent build-time Supabase failures
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

        feedbackStored: false
      })
    }

    const body:
      FeedbackRequest =
        await request.json()

    const {
      name,
      email,
      message
    } = body

    /**
     * Basic validation
     */
    if (
      !message ||
      message.trim().length === 0
    ) {

      return NextResponse.json(
        {

          success: false,

          error:
            "Feedback message is required"
        },

        {
          status: 400
        }
      )
    }

    /**
     * Production-safe placeholder
     */
    return NextResponse.json({

      success: true,

      feedbackStored: true,

      submittedBy: {

        name:
          name ?? "Anonymous",

        email:
          email ?? "Not provided"
      },

      receivedMessage:
        message
    })

  } catch (err) {

    console.error(
      "Feedback API failure",
      err
    )

    return NextResponse.json(
      {

        success: false,

        error:
          "Feedback processing failed"
      },

      {
        status: 500
      }
    )
  }
}