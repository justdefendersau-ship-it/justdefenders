import { NextResponse }
from "next/server"

import { prisma }
from "@/backend/database/prismaClient"

export async function POST(request: Request) {

  const body =
  await request.json()

  const note =
  await prisma.incidentNote.create({

    data: {

      incidentId:
      body.incidentId,

      note:
      body.note,

      createdAt:
      new Date()
    }
  })

  return NextResponse.json({

    success: true,

    note
  })
}