import {
  NextResponse
}
from "next/server"

import {
  prisma
}
from "../../../../lib/prisma"

export async function GET(){

  const hits =
  await prisma.intelligenceHit.findMany({

    orderBy:{

      createdAt:"desc"
    }
  })

  return NextResponse.json(
    hits
  )
}
