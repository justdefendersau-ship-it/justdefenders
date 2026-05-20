import { NextResponse }
from "next/server"

import { prisma }
from "@/backend/database/prismaClient"

export async function GET() {

  const playbooks =
  await prisma.sOARPlaybook.findMany({

    orderBy: {

      id: "desc"
    }
  })

  return NextResponse.json(
    playbooks
  )
}