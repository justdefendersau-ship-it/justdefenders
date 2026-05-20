import {
  NextResponse
}
from "next/server"

import {
  prisma
}
from "../../../../lib/prisma"

export async function GET(){

  const simulations =
  await prisma.adversarySimulation.findMany({

    orderBy:{

      createdAt:"desc"
    }
  })

  return NextResponse.json(
    simulations
  )
}