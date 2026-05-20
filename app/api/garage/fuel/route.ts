// =====================================================
// JustDefenders Â©
// File: fuel API (corrected for source_type model)
// =====================================================

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: Request){

  const {
    vehicle_id,
    litres,
    odometer,
    latitude,
    longitude,
    price_per_litre,
    fuel_source_id
  } = await req.json()

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const total_cost = litres * (price_per_litre || 0)

  // -------------------------------
  // 1. INSERT EVENT
  // -------------------------------
  await supabase.from("fuel_map_events").insert([{
    vehicle_id,
    fuel_volume: litres,
    odometer,
    latitude,
    longitude,
    price_per_litre,
    total_cost,
    fuel_source_id
  }])

  // -------------------------------
  // 2. LOAD LAST TWO ENTRIES
  // -------------------------------
  const { data: logs } = await supabase
    .from("fuel_map_events")
    .select("*")
    .eq("vehicle_id", vehicle_id)
    .order("created_at", { ascending:false })
    .limit(2)

  let anomaly: any = null

  if(logs && logs.length === 2){

    const current = logs[0]
    const previous = logs[1]

    const kmDiff = current.odometer - previous.odometer
    const litresUsed = current.fuel_volume

    if(kmDiff > 0 && litresUsed > 0){

      let kmPerLitre = kmDiff / litresUsed

      // -------------------------------
      // 3. GET SOURCE TYPE (FIXED)
      // -------------------------------
      const { data: source } = await supabase
        .from("fuel_sources")
        .select("source_type")
        .eq("id", current.fuel_source_id)
        .single()

      const type = source?.source_type || "unknown"

      // -------------------------------
      // 4. APPLY SOURCE WEIGHTING
      // -------------------------------
      let riskMultiplier = 1

      switch(type){
        case "jerry_can":
          riskMultiplier = 1.3
          break
        case "portable_tank":
          riskMultiplier = 1.2
          break
        case "aux_tank":
          riskMultiplier = 1.1
          break
        case "fuel_station":
          riskMultiplier = 1
          break
        case "main_tank":
          riskMultiplier = 1
          break
      }

      kmPerLitre = kmPerLitre / riskMultiplier

      // -------------------------------
      // 5. LOAD HISTORY
      // -------------------------------
      const { data: history } = await supabase
        .from("fuel_map_events")
        .select("*")
        .eq("vehicle_id", vehicle_id)

      let avg = kmPerLitre

      if(history && history.length > 3){

        let total = 0
        let count = 0

        for(let i=1;i<history.length;i++){
          const a = history[i]
          const b = history[i-1]

          const dKm = a.odometer - b.odometer
          const dLitres = a.fuel_volume

          if(dKm > 0 && dLitres > 0){
            total += dKm / dLitres
            count++
          }
        }

        if(count > 0){
          avg = total / count
        }
      }

      // -------------------------------
      // 6. DETECT ANOMALY
      // -------------------------------
      const deviation = Math.abs(kmPerLitre - avg) / avg

      if(deviation > 0.25){

        let message = "Fuel efficiency anomaly detected"

        if(type === "jerry_can"){
          message = "Possible contaminated fuel (jerry can)"
        }

        if(type === "portable_tank"){
          message = "Fuel variance from portable tank"
        }

        anomaly = {
          type: "EFFICIENCY_DROP",
          source_type: type,
          message,
          current: kmPerLitre,
          average: avg
        }

        await supabase.from("maintenance_notifications").insert([{
          vehicle_id,
          message,
          priority: "medium"
        }])
      }
    }

    // -------------------------------
    // 7. UPDATE ODOMETER
    // -------------------------------
    await supabase.from("vehicle_odometer").insert([{
      vehicle_id,
      km: odometer,
      source: "fuel"
    }])
  }

  return NextResponse.json({
    success:true,
    anomaly
  })
}