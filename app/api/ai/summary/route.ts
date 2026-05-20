import {
  NextResponse
}
from "next/server"

import {
  prisma
}
from "../../../../lib/prisma"

export async function GET(){

  const summaries =
  await prisma.caseAudit.findMany({

    orderBy:{

      createdAt:"desc"
    },

    take:25
  })

  return NextResponse.json(
    summaries
  )
}