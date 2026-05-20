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

        username:
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

      user.password
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

        username:user.username,

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