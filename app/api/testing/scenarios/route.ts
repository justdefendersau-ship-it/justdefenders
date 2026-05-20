import {
  NextResponse
}
from "next/server"

import fs from "fs"

import path from "path"

export async function GET(){

  const testingPath =
  path.join(

    process.cwd(),
    "data",
    "testing",
    "internal-test-scenarios.json"
  )

  const scenarios =
  JSON.parse(

    fs.readFileSync(
      testingPath,
      "utf8"
    )
  )

  return NextResponse.json({

    scenarios,

    timestamp:
    new Date().toISOString()
  })
}