import { NextResponse }
from "next/server"

import {
  evaluateExecutiveOperations
}
from "@/backend/final-operations/enterpriseExecutiveOperations"

export async function GET(){

  return NextResponse.json(
    evaluateExecutiveOperations()
  )
}
