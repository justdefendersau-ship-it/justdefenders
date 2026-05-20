import { NextResponse }
from "next/server"

import { prisma }
from "@/backend/database/prismaClient"

export async function POST(request: Request) {

  const body =
  await request.json()

  const telemetry =
  body.telemetry || {}

  const indicators =
  body.indicators || []

  await prisma.huntSession.create({

    data: {

      telemetry,

      indicators,

      createdAt:
      new Date()
    }
  })

  return NextResponse.json({

    success: true,

    hunt: {

      status: "ACTIVE",

      telemetry,

      indicators
    }
  })
}