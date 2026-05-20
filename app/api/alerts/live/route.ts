import { NextResponse }
from "next/server"

export async function GET(){

  return NextResponse.json({

    activeAlerts:6,

    highestSeverity:
    "MEDIUM",

    timestamp:
    new Date()
  })
}
