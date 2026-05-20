import {
  NextResponse
}
from "next/server"

import {
  prisma
}
from "../../../../lib/prisma"

export async function GET(){

  const exposure =
  await prisma.exposurePath.findMany({

    orderBy:{

      createdAt:"desc"
    }
  })

  return NextResponse.json(
    exposure
  )
}