import { NextResponse }
from "next/server"

import {
  evaluateExecutiveControl
}
from "@/backend/executive-control/enterpriseExecutiveControl"

export async function GET(){

  return NextResponse.json(
    evaluateExecutiveControl()
  )
}
