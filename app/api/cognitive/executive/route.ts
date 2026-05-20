import {
  NextResponse
}
from "next/server"

import {
  prisma
}
from "../../../../lib/prisma"

export async function GET(){

  const executive =
  await prisma.executiveNarrative.findMany({

    orderBy:{

      createdAt:"desc"
    }
  })

  return NextResponse.json(
    executive
  )
}