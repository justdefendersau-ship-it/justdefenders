import {
  NextResponse
}
from "next/server"

import {
  prisma
}
from "../../../../lib/prisma"

export async function GET(){

  const rules =
  await prisma.detectionRule.findMany({

    orderBy:{

      createdAt:"desc"
    }
  })

  return NextResponse.json(
    rules
  )
}
