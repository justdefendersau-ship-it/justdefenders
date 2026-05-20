import {
  NextResponse
}
from "next/server"

import {
  prisma
}
from "../../../../lib/prisma"

export async function GET(){

  const memory =
  await prisma.agentMemory.findMany({

    orderBy:{

      createdAt:"desc"
    }
  })

  return NextResponse.json(
    memory
  )
}