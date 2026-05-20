import {
  NextResponse
}
from "next/server"

import {
  prisma
}
from "../../../../lib/prisma"

export async function GET(){

  const iocs =
  await prisma.threatIOC.findMany({

    orderBy:{

      createdAt:"desc"
    }
  })

  return NextResponse.json(
    iocs
  )
}
