import {
  NextResponse
}
from "next/server"

import {
  prisma
}
from "../../../../lib/prisma"

export async function GET(){

  const learning =
  await prisma.learningCycle.findMany({

    orderBy:{

      createdAt:"desc"
    }
  })

  return NextResponse.json(
    learning
  )
}