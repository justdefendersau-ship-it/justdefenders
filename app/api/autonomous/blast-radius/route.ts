import {
  NextResponse
}
from "next/server"

import {
  prisma
}
from "../../../../lib/prisma"

export async function GET(){

  const blast =
  await prisma.blastRadius.findMany({

    orderBy:{

      createdAt:"desc"
    }
  })

  return NextResponse.json(
    blast
  )
}