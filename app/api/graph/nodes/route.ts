import {
  NextResponse
}
from "next/server"

import {
  prisma
}
from "../../../../lib/prisma"

export async function GET(){

  const nodes =
  await prisma.graphNode.findMany({

    orderBy:{

      riskScore:"desc"
    }
  })

  return NextResponse.json(
    nodes
  )
}