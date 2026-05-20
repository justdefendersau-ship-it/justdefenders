import {
  NextResponse
}
from "next/server"

export async function GET(){

  return NextResponse.json({

    validated:4,

    inProgress:4,

    apiReady:0,

    scrapingSupported:7,

    fitmentSupported:7,

    tradeAccounts:4,

    timestamp:
    new Date().toISOString()
  })
}