import {
  NextResponse
}
from "next/server"

import fs from "fs"

import path from "path"

export async function GET(){

  const contextPath =
  path.join(

    process.cwd(),
    "data",
    "ai-orchestration",
    "context",
    "operational-context.json"
  )

  const context =
  JSON.parse(

    fs.readFileSync(
      contextPath,
      "utf8"
    )
  )

  return NextResponse.json({

    context:
    context[0],

    timestamp:
    new Date().toISOString()
  })
}