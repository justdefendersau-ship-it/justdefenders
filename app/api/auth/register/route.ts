import { NextRequest, NextResponse }
from "next/server"

import bcrypt
from "bcryptjs"

import { prisma }
from "@/backend/database/prismaClient"

export async function POST(
  request:NextRequest
){

  const body =
  await request.json()

  const hashedPassword =
  await bcrypt.hash(
    body.password,
    12
  )

  const tenant =
  await prisma.tenant.create({

    data: {

      name:
      body.tenantName
    }
  })

  const user =
  await prisma.user.create({

    data: {

      email:
      body.email,

      passwordHash:
      hashedPassword,

      role:
      "ADMIN",

      tenantId:
      tenant.id
    }
  })

  return NextResponse.json({

    success:true,

    userId:user.id
  })
}
