import {
  NextRequest,
  NextResponse
}
from "next/server"

import {
  prisma
}
from "../../../../lib/prisma"

export async function GET(
  request:NextRequest
){

  const search =
  request.nextUrl.searchParams.get("q")

  const results =
  await prisma.historicalEvent.findMany({

    where:{

      OR:[

        {

          source:{

            contains:
            search || ""
          }
        },

        {

          severity:{

            contains:
            search || ""
          }
        },

        {

          payload:{

            contains:
            search || ""
          }
        }
      ]
    },

    orderBy:{

      createdAt:"desc"
    },

    take:100
  })

  return NextResponse.json(
    results
  )
}