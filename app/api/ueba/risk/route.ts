import {
  NextResponse
}
from "next/server"

import {
  prisma
}
from "../../../../lib/prisma"

export async function GET(){

  const risk =
  await prisma.uEBAEntityRisk.findMany({

    orderBy:{

      riskScore:"desc"
    }
  })

  return NextResponse.json(
    risk
  )
}
