export const runtime = "nodejs"

import { NextResponse } from "next/server"

export async function GET() {

  const url = "https://www.lrdirect.com/NAD500210/"

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "Accept-Language": "en-GB,en;q=0.9",
        "Accept": "text/html,application/xhtml+xml",
        "Connection": "keep-alive"
      }
    })

    const html = await res.text()

    return NextResponse.json({
      success: true,
      status: res.status,
      stage: res.ok ? "fetched" : "blocked"
    })

  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message
    })
  }
}
