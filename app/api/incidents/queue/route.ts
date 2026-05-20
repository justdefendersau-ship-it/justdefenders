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

  try {

    const incidents =
    await prisma.incident.findMany({

      orderBy: {

        createdAt:"desc"
      },

      take:50
    })

    return NextResponse.json(
      incidents
    )

  } catch(error){

    return NextResponse.json({

      success:false,

      error:"Incident query failure"
    })
  }
}

export async function POST(
  request:NextRequest
){

  try {

    const body =
    await request.json()

    const incident =
    await prisma.incident.create({

      data: {

        title:
        body.title,

        severity:
        body.severity,

        status:"OPEN",

        assignedTo:
        body.assignedTo,

        alertId:
        body.alertId
      }
    })

    return NextResponse.json(
      incident
    )

  } catch(error){

    return NextResponse.json({

      success:false,

      error:"Incident creation failure"
    })
  }
}
