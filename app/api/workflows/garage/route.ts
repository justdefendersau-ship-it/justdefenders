import {
  NextResponse
}
from "next/server"

import fs from "fs"

import path from "path"

export async function GET(){

  const garagePath =
  path.join(

    process.cwd(),
    "data",
    "workflows",
    "garage-workflows.json"
  )

  const garage =
  JSON.parse(

    fs.readFileSync(
      garagePath,
      "utf8"
    )
  )

  return NextResponse.json({

    garage,

    timestamp:
    new Date().toISOString()
  })
}