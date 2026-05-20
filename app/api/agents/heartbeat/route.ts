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

  try {

    const body =
    await request.json()

    await prisma.agent.update({

      where:{

        id:body.agentId
      },

      data:{

        status:"ONLINE",

        lastSeen:new Date()
      }
    })

    return NextResponse.json({

      success:true
    })

  } catch(error){

    return NextResponse.json({

      success:false,

      error:"Heartbeat failure"
    })
  }
}
