// =====================================================
// JustDefenders Â©
// File: diagnostics â†’ parts â†’ suppliers â†’ cost engine
// =====================================================

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: Request){

  const { vehicle_id } = await req.json()

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // -------------------------------
  // LOAD FUEL EVENTS
  // -------------------------------
  const { data: logs } = await supabase
    .from("fuel_map_events")
    .select("*")
    .eq("vehicle_id", vehicle_id)
    .order("created_at", { ascending:false })
    .limit(6)

  if(!logs || logs.length < 3){
    return NextResponse.json({ success:false })
  }

  // -------------------------------
  // BUILD EFFICIENCY SERIES
  // -------------------------------
  const series:any[] = []

  for(let i=1;i<logs.length;i++){
    const a = logs[i-1]
    const b = logs[i]

    const kmDiff = a.odometer - b.odometer
    const litres = a.fuel_volume

    if(kmDiff > 0 && litres > 0){
      series.push({
        efficiency: kmDiff / litres,
        source_id: a.fuel_source_id
      })
    }
  }

  if(series.length < 2){
    return NextResponse.json({ success:false })
  }

  const latest = series[0].efficiency
  const avg = series.reduce((t,s)=>t+s.efficiency,0) / series.length
  const deviation = (avg - latest) / avg

  // -------------------------------
  // SOURCE TYPE
  // -------------------------------
  const { data: source } = await supabase
    .from("fuel_sources")
    .select("source_type")
    .eq("id", series[0].source_id)
    .single()

  const type = source?.source_type || "unknown"

  // -------------------------------
  // TREND
  // -------------------------------
  let trend = 0
  for(let i=1;i<series.length;i++){
    trend += (series[i-1].efficiency - series[i].efficiency)
  }

  // -------------------------------
  // ROOT CAUSE
  // -------------------------------
  let cause = "unknown"
  let message = "Unable to determine issue"
  let confidence = 0.5

  if(deviation > 0.25 && type === "jerry_can"){
    cause = "bad_fuel"
    message = "Contaminated fuel likely"
    confidence = 0.85
  }
  else if(deviation > 0.15 && trend < 0){
    cause = "injectors"
    message = "Injector wear likely"
    confidence = 0.75
  }
  else if(deviation > 0.25 && trend > 0){
    cause = "fuel_pump"
    message = "Fuel pump issue likely"
    confidence = 0.8
  }
  else if(deviation > 0.2){
    cause = "fuel_filter"
    message = "Fuel restriction detected"
    confidence = 0.7
  }

  // -------------------------------
  // MAP CAUSE â†’ PARTS
  // -------------------------------
  const partMap:any = {
    bad_fuel: ["ERR3340"],
    injectors: ["ERR3340","ANR1808"],
    fuel_pump: ["ERR3340"],
    fuel_filter: ["ESR2623"]
  }

  const parts = partMap[cause] || []

  // -------------------------------
  // GET SUPPLIER PARTS
  // -------------------------------
  const { data: supplierParts } = await supabase
    .from("supplier_parts")
    .select("*")

  const filtered = (supplierParts || []).filter(sp =>
    parts.includes(sp.part_number)
  )

  // -------------------------------
  // GET SUPPLIERS
  // -------------------------------
  const { data: suppliers } = await supabase
    .from("suppliers")
    .select("*")

  // -------------------------------
  // BUILD RESULTS
  // -------------------------------
  const enriched = filtered.map(sp => {

    const supplier = suppliers?.find(s => s.id === sp.supplier_id)

    return {
      part: sp.part_number,
      supplier: supplier?.name || "Unknown",
      price: Number(sp.price || 0)
    }
  })

  // group by part
  const grouped: Record<string, any[]> = {}

  enriched.forEach(item=>{
    if(!grouped[item.part]) grouped[item.part] = []
    grouped[item.part].push(item)
  })

  const results = Object.keys(grouped).map(part=>{

    const items = grouped[part]

    const cheapest = [...items].sort((a,b)=>a.price-b.price)[0]

    return {
      part,
      cheapest,
      options: items
    }
  })

  // -------------------------------
  // RESPONSE
  // -------------------------------
  return NextResponse.json({
    success:true,
    cause,
    message,
    confidence,
    deviation,
    recommendations: results
  })
}