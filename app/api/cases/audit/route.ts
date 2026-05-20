import {
  NextResponse
}
from "next/server"

import {
  prisma
}
from "../../../../lib/prisma"

export async function GET(){

  const audit =
  await prisma.caseAudit.findMany({

    orderBy:{

      createdAt:"desc"
    }
  })

  return NextResponse.json(
    audit
  )
}