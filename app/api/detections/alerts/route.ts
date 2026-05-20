import {
  NextResponse
}
from "next/server"

import {
  prisma
}
from "../../../../lib/prisma"

export async function GET(){

  const alerts =
  await prisma.detectionAlert.findMany({

    orderBy: {

      createdAt:"desc"
    },

    take:50
  })

  return NextResponse.json(
    alerts
  )
}
