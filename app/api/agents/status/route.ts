import {
  NextResponse
}
from "next/server"

import {
  prisma
}
from "../../../../lib/prisma"

export async function GET(){

  const agents =
  await prisma.aISecurityAgent.findMany({

    orderBy:{

      createdAt:"asc"
    }
  })

  return NextResponse.json(
    agents
  )
}