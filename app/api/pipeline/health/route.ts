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

    const queueDepth =
    await prisma.eventQueue.count({

      where:{

        status:"QUEUED"
      }
    })

    const failed =
    await prisma.eventQueue.count({

      where:{

        status:"FAILED"
      }
    })

    const processed =
    await prisma.eventQueue.count({

      where:{

        status:"PROCESSED"
      }
    })

    return NextResponse.json({

      status:"HEALTHY",

      queueDepth,

      failed,

      processed,

      timestamp:
      new Date()
    })

  } catch {

    return NextResponse.json({

      status:"UNHEALTHY"
    })
  }
}
