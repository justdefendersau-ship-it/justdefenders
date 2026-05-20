import {
  NextResponse
}
from "next/server"

import fs from "fs"

import path from "path"

export async function POST(){

  const reasoningPath =
  path.join(

    process.cwd(),
    "data",
    "operational-engine",
    "reasoning",
    "cross-domain-reasoning.json"
  )

  const reasoning =
  JSON.parse(

    fs.readFileSync(
      reasoningPath,
      "utf8"
    )
  )

  return NextResponse.json({

    reasoning:
    reasoning[0],

    timestamp:
    new Date().toISOString()
  })
}