import {
  NextResponse
}
from "next/server"

import fs from "fs"

import path from "path"

export async function GET(){

  const supplierPath =
  path.join(

    process.cwd(),
    "data",
    "commercial-rollout",
    "suppliers",
    "supplier-commercial.json"
  )

  const suppliers =
  JSON.parse(

    fs.readFileSync(
      supplierPath,
      "utf8"
    )
  )

  return NextResponse.json({

    suppliers,

    timestamp:
    new Date().toISOString()
  })
}