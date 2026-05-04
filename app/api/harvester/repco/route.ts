export const runtime = "nodejs"

import { NextResponse } from "next/server"
import { chromium } from "playwright"

export async function GET() {

  const url = "https://www.repco.com.au/search?q=starter%20motor"

  const browser = await chromium.launch()
  const page = await browser.newPage()

  try {
    await page.goto(url, { waitUntil: "networkidle" })

    // Wait longer to ensure render
    await page.waitForTimeout(5000)

    const html = await page.content()

    await browser.close()

    return NextResponse.json({
      success: true,
      preview: html.substring(0, 2000)
    })

  } catch (err) {
    await browser.close()
    return NextResponse.json({
      success: false,
      error: err.message
    })
  }
}
