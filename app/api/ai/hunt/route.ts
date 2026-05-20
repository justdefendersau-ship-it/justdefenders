import {
  NextRequest,
  NextResponse
}
from "next/server"

import {
  prisma
}
from "../../../../lib/prisma"

export async function POST(
  request:NextRequest
){

  const body =
  await request.json()

  const query =
  body.query || ""

  const telemetry =
  await prisma.telemetryEvent.findMany({

    take:50,

    orderBy:{

      createdAt:"desc"
    }
  })

  const results =
  telemetry.filter((event:any) => {

    return (
      event.source || ""
    )
    .toLowerCase()
    .includes(
      query.toLowerCase()
    )
  })

  return NextResponse.json({

    query,

    results,

    count:
    results.length
  })
}