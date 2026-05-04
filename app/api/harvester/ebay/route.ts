export const runtime = "nodejs"

import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET() {

  const query = "land rover defender starter motor"
  const url = `https://www.ebay.com.au/sch/i.html?_nkw=${encodeURIComponent(query)}&_ipg=25&_pgn=1`

  let price = null
  let title = null

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122 Safari/537.36",
        "Accept-Language": "en-AU,en;q=0.9",
        "Accept": "text/html"
      }
    })

    const html = await res.text()

    // DEBUG CHECK
    if (!html.includes("s-item")) {
      return NextResponse.json({
        success: true,
        note: "No listing DOM returned (likely bot-filtered)"
      })
    }

    // EXTRACT LISTINGS
    const items = html.split('class="s-item"')

    for (let item of items) {

      const tMatch = item.match(/s-item__title">([^<]+)</)
      const pMatch = item.match(/s-item__price">\$([0-9,\.]+)/)

      if (tMatch && pMatch) {
        const t = tMatch[1]
        const p = pMatch[1]

        if (!t.includes("Shop on eBay")) {
          title = t
          price = parseFloat(p.replace(/,/g, ""))
          break
        }
      }
    }

  } catch (err) {
    console.error("eBay fetch failed", err)
  }

  const ebayData = {
    "eBay": {
      trust: 75,
      distance: 0,
      pickup: false,
      price,
      product: title
    }
  }

  const filePath = path.join(process.cwd(), "data", "supplier-live.json")

  let existing = {}
  try {
    existing = JSON.parse(fs.readFileSync(filePath))
  } catch {}

  const updated = { ...existing, ...ebayData }

  fs.writeFileSync(filePath, JSON.stringify(updated, null, 2))

  return NextResponse.json({
    success: true,
    price,
    product: title
  })
}
