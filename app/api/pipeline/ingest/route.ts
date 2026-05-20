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

    const queued =
    await prisma.eventQueue.create({

      data:{

        tenantId:
        body.tenantId,

        agentId:
        body.agentId,

        eventType:
        body.eventType,

        payload:
        JSON.stringify(
          body.payload
        ),

        status:"QUEUED"
      }
    })

    return NextResponse.json({

      success:true,

      queued
    })

  } catch(error){

    return NextResponse.json({

      success:false,

      error:"Queue ingestion failure"
    })
  }
}
