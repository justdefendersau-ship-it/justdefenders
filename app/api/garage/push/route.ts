// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\garage\push\route.ts
// Timestamp: 15 May 2026 01:45 Sydney

import {
  NextRequest,
  NextResponse
} from "next/server"

interface PushNotificationRequest {

  title?: string

  message?: string
}

export async function POST(
  request: NextRequest
) {

  try {

    /**
     * Prevent build-time VAPID failures
     */
    const vapidPublicKey =
      process.env
        .NEXT_PUBLIC_VAPID_PUBLIC_KEY

    const vapidPrivateKey =
      process.env
        .VAPID_PRIVATE_KEY

    if (
      !vapidPublicKey ||
      !vapidPrivateKey
    ) {

      return NextResponse.json({

        success: true,

        warning:
          "Push notifications disabled - VAPID keys missing"
      })
    }

    const body:
      PushNotificationRequest =
        await request.json()

    return NextResponse.json({

      success: true,

      notification: {

        title:
          body.title ??
          "JustDefenders Notification",

        message:
          body.message ??
          "Garage event received"
      }
    })

  } catch (err) {

    console.error(
      "Garage push failure",
      err
    )

    return NextResponse.json(
      {

        success: false,

        error:
          "Push notification failed"
      },

      {
        status: 500
      }
    )
  }
}