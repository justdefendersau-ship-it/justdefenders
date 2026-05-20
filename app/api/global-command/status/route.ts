import { NextResponse }
from "next/server"

import {
  evaluateGlobalCommand
}
from "@/backend/global-command/enterpriseGlobalCommand"

export async function GET(){

  return NextResponse.json(
    evaluateGlobalCommand()
  )
}
