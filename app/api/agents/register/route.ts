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

    const agent =
    await prisma.agent.create({

      data: {

        tenantId:
        body.tenantId,

        hostname:
        body.hostname,

        operatingSystem:
        body.operatingSystem,

        agentVersion:
        body.agentVersion,

        enrollmentKey:
        body.enrollmentKey,

        status:"ONLINE",

        lastSeen:
        new Date()
      }
    })

    return NextResponse.json({

      success:true,

      agent
    })

  } catch(error){

    return NextResponse.json({

      success:false,

      error:"Agent registration failure"
    })
  }
}
