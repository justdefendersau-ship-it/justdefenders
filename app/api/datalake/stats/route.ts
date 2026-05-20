import {
  NextResponse
}
from "next/server"

import {
  prisma
}
from "../../../../lib/prisma"

export async function GET(){

  const historical =
  await prisma.historicalEvent.count()

  const telemetry =
  await prisma.telemetryEvent.count()

  const alerts =
  await prisma.detectionAlert.count()

  const incidents =
  await prisma.incident.count()

  return NextResponse.json({

    historical,

    telemetry,

    alerts,

    incidents
  })
}