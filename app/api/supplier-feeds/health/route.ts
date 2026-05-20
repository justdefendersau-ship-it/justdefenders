import {
  NextResponse
}
from "next/server"

export async function GET(){

  return NextResponse.json({

    healthyFeeds:3,

    warningFeeds:2,

    failedFeeds:0,

    apiFeeds:1,

    csvFeeds:2,

    xmlFeeds:1,

    freshnessAverage:92,

    timestamp:
    new Date().toISOString()
  })
}