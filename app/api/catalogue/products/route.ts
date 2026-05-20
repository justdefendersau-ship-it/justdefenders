import {
  NextResponse
}
from "next/server"

import fs from "fs"

import path from "path"

export async function GET(){

  const productsPath =
  path.join(

    process.cwd(),
    "data",
    "normalised",
    "normalised-products.json"
  )

  const products =
  JSON.parse(

    fs.readFileSync(
      productsPath,
      "utf8"
    )
  )

  return NextResponse.json({

    products,

    total:
    products.length,

    timestamp:
    new Date().toISOString()
  })
}