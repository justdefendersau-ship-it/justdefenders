import {
  NextResponse
}
from "next/server"

import fs from "fs"

import path from "path"

export async function GET(){

  const riskPath =
  path.join(

    process.cwd(),
    "data",
    "operational-engine",
    "risk",
    "operational-risk.json"
  )

  const risk =
  JSON.parse(

    fs.readFileSync(
      riskPath,
      "utf8"
    )
  )

  return NextResponse.json({

    risk:
    risk[0],

    timestamp:
    new Date().toISOString()
  })
}