import {
  NextResponse
}
from "next/server"

import {
  prisma
}
from "../../../../lib/prisma"

export async function GET(){

  const actions =
  await prisma.autonomousAction.findMany({

    orderBy:{

      createdAt:"desc"
    }
  })

  return NextResponse.json(
    actions
  )
}