import {
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

    const alerts =
    await prisma.detectionAlert.findMany({

      orderBy: {

        createdAt:"desc"
      },

      take:50
    })

    const telemetry =
    await prisma.telemetryEvent.findMany({

      orderBy: {

        createdAt:"desc"
      },

      take:50
    })

    return NextResponse.json({

      incidents,

      alerts,

      telemetry
    })

  } catch(error){

    return NextResponse.json({

      success:false,

      error:"Timeline query failure"
    })
  }
}
