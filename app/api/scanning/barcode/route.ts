import {
  NextResponse
}
from "next/server"

import fs from "fs"

import path from "path"

export async function POST(){

  const barcodePath =
  path.join(

    process.cwd(),
    "data",
    "scanning",
    "barcode-index.json"
  )

  const barcodes =
  JSON.parse(

    fs.readFileSync(
      barcodePath,
      "utf8"
    )
  )

  return NextResponse.json({

    scan:
    barcodes[0],

    timestamp:
    new Date().toISOString()
  })
}