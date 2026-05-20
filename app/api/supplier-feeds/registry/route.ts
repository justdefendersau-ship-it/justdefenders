import {
  NextResponse
}
from "next/server"

import fs from "fs"

import path from "path"

export async function GET(){

  const registryPath =
  path.join(

    process.cwd(),
    "data",
    "supplier-feeds",
    "supplier-feed-registry.json"
  )

  const feeds =
  JSON.parse(

    fs.readFileSync(
      registryPath,
      "utf8"
    )
  )

  return NextResponse.json({

    feeds,

    total:
    feeds.length,

    timestamp:
    new Date().toISOString()
  })
}