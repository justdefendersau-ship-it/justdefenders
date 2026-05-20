import {
  NextResponse
}
from "next/server"

import fs from "fs"

import path from "path"

export async function GET(){

  const feedbackPath =
  path.join(

    process.cwd(),
    "data",
    "external-alpha",
    "feedback",
    "external-alpha-feedback.json"
  )

  const feedback =
  JSON.parse(

    fs.readFileSync(
      feedbackPath,
      "utf8"
    )
  )

  return NextResponse.json({

    feedback,

    timestamp:
    new Date().toISOString()
  })
}