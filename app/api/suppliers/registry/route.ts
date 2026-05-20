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
    "suppliers",
    "supplier-registry.json"
  )

  const data =
  JSON.parse(

    fs.readFileSync(
      registryPath,
      "utf8"
    )
  )

  return NextResponse.json({

    suppliers:data,

    total:data.length,

    timestamp:
    new Date().toISOString()
  })
}