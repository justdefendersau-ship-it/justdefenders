import { NextResponse }
from "next/server"

import {
  evaluateCicdFederation
}
from "@/backend/cicd-federation/enterpriseCicdRuntime"

export async function GET(){

  return NextResponse.json(
    evaluateCicdFederation()
  )
}
