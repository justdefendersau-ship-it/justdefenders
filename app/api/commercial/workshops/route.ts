import {
  NextResponse
}
from "next/server"

import fs from "fs"

import path from "path"

export async function GET(){

  const workshopPath =
  path.join(

    process.cwd(),
    "data",
    "commercial-rollout",
    "workshops",
    "workshop-pilots.json"
  )

  const workshops =
  JSON.parse(

    fs.readFileSync(
      workshopPath,
      "utf8"
    )
  )

  return NextResponse.json({

    workshops,

    timestamp:
    new Date().toISOString()
  })
}