import { NextResponse }
from "next/server"

import { prisma }
from "@/backend/database/prismaClient"

export async function GET() {

  const iocs =
  await prisma.incidentNote.findMany({

    orderBy: {

      id: "desc"
    }
  })

  return NextResponse.json(
    iocs
  )
}