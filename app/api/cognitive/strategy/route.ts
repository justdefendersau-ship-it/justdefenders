import {
  NextResponse
}
from "next/server"

import {
  prisma
}
from "../../../../lib/prisma"

export async function GET(){

  const strategy =
  await prisma.strategicThreatAssessment.findMany({

    orderBy:{

      createdAt:"desc"
    }
  })

  return NextResponse.json(
    strategy
  )
}