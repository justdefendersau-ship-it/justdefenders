import {
  NextResponse
}
from "next/server"

import {
  prisma
}
from "../../../../lib/prisma"

export async function GET(){

  const forecast =
  await prisma.cognitiveForecast.findMany({

    orderBy:{

      createdAt:"desc"
    }
  })

  return NextResponse.json(
    forecast
  )
}