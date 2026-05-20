import {
  NextRequest,
  NextResponse
}
from "next/server"

import {
  prisma
}
from "../../../../lib/prisma"

export async function GET(){

  const tenants =
  await prisma.tenant.findMany({

    orderBy: {

      createdAt:"desc"
    }
  })

  return NextResponse.json(
    tenants
  )
}

export async function POST(
  request:NextRequest
){

  const body =
  await request.json()

  const tenant =
  await prisma.tenant.create({

    data: {

      name:
      body.name,

      tier:
      body.tier
    }
  })

  return NextResponse.json(
    tenant
  )
}
