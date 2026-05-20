import {
  NextResponse
}
from "next/server"

import {
  prisma
}
from "../../../../lib/prisma"

export async function GET(){

  const detections =
  await prisma.evolutionaryDetection.findMany({

    orderBy:{

      createdAt:"desc"
    }
  })

  return NextResponse.json(
    detections
  )
}