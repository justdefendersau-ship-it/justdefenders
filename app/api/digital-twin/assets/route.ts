import {
  NextResponse
}
from "next/server"

import {
  prisma
}
from "../../../../lib/prisma"

export async function GET(){

  const assets =
  await prisma.digitalTwinAsset.findMany({

    orderBy:{

      exposureScore:"desc"
    }
  })

  return NextResponse.json(
    assets
  )
}