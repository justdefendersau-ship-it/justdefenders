import { NextResponse }
from "next/server"

import {
  evaluateCommercialOperations
}
from "@/backend/commercial-operations/enterpriseCommercialOperations"

export async function GET(){

  return NextResponse.json(
    evaluateCommercialOperations()
  )
}
