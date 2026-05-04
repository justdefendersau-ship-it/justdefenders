import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET() {

  // Simulated "live" supplier fetch
  const liveData = {
    "AutoParts Co": { trust: 85, distance: 12, pickup: true, priceModifier: 1.0 },
    "Parts Direct": { trust: 78, distance: 35, pickup: false, priceModifier: 0.95 },
    "Local Garage": { trust: 92, distance: 5, pickup: true, priceModifier: 1.1 }
  }

  const filePath = path.join(process.cwd(), "data", "supplier-live.json")

  fs.writeFileSync(filePath, JSON.stringify(liveData, null, 2))

  return NextResponse.json({ success: true, updated: true })
}
