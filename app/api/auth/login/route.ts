import {
  NextRequest,
  NextResponse
}
from "next/server"

import bcrypt
from "bcryptjs"

import {
  prisma
}
from "../../../../lib/prisma"

export async function POST(
  request:NextRequest
){

  try {

    const body =
    await request.json()

    console.log(
      "Login request:",
      body.username
    )

    const user =
    await prisma.user.findUnique({

where: {

  email:
    body.username
}
    })

    if(!user){

      return NextResponse.json({

        success:false,

        message:"Invalid credentials"
      })
    }

const valid =
  await bcrypt.compare(

    body.password,

    user.passwordHash
    ||
    ""
  )

    if(!valid){

      return NextResponse.json({

        success:false,

        message:"Invalid credentials"
      })
    }

    return NextResponse.json({

      success:true,

      user: {

        id:user.id,

        email:user.email,

        role:user.role
      }
    })

  } catch(error){

    console.error(
      "AUTH FAILURE:",
      error
    )

    return NextResponse.json({

      success:false,

      message:"Authentication failure"
    })
  }
}