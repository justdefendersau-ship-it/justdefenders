// =====================================================
// JustDefenders Â©
// Repair Plan Engine
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
  // 1. RUN DIAGNOSTICS
  // -------------------------------
  const diagRes = await fetch(process.env.BASE_URL + "/api/garage/diagnostics",{
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({ vehicle_id })
  })

  const diag = await diagRes.json()

  if(!diag.success){
    return NextResponse.json({ success:false })
  }

  const cause = diag.cause

  // -------------------------------
  // 2. MAP LABOUR TIME (HOURS)
  // -------------------------------
  const labourMap:any = {
    fuel_pump: 2.5,
    injectors: 4,
    fuel_filter: 1,
    bad_fuel: 1.5
  }

  const labourHours = labourMap[cause] || 2

  // -------------------------------
  // 3. GET PART RECOMMENDATIONS
  // -------------------------------
  const recommendations = diag.recommendations || []

  let totalCost = 0

  const items = recommendations.map((r:any)=>{

    const cheapest = r.cheapest

    const price = Number(cheapest?.price || 0)

    totalCost += price

    return {
      part_number: r.part,
      supplier: cheapest?.supplier || "Unknown",
      price,
      estimated_hours: labourHours / recommendations.length,
      priority: "high"
    }
  })

  // -------------------------------
  // 4. SAVE PLAN
  // -------------------------------
  const { data: plan } = await supabase
    .from("repair_plans")
    .insert([{
      vehicle_id,
      cause,
      confidence: diag.confidence,
      total_estimated_cost: totalCost,
      total_estimated_time_hours: labourHours
    }])
    .select()
    .single()

  // -------------------------------
  // 5. SAVE ITEMS
  // -------------------------------
  for(const item of items){
    await supabase.from("repair_plan_items").insert([{
      repair_plan_id: plan.id,
      ...item
    }])
  }

  return NextResponse.json({
    success:true,
    plan,
    items
  })
}