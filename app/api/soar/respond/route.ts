import { NextResponse }
from "next/server"

import { prisma }
from "@/backend/database/prismaClient"

export async function POST(request: Request) {

  const body =
  await request.json()

  const action =
  await prisma.responseAction.create({

    data: {

      action:
      body.action,

      incidentId:
      body.incidentId,

      createdAt:
      new Date()
    }
  })

  return NextResponse.json({

    success: true,

    action
  })
}