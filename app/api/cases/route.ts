import { NextResponse }
from "next/server"

import { prisma }
from "@/backend/database/prismaClient"

export async function GET(){

  const cases =
  await prisma.securityCase.findMany({

    orderBy:{

      createdAt:"desc"
    }
  })

  return NextResponse.json({

    success:true,

    cases
  })
}
