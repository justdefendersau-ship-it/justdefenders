import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// =====================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\events\route.ts
// Timestamp: 2026-05-06 09:30
// Purpose: Unified event ingestion (aligned to existing schema)
// =====================================================

export async function POST(req:Request){

  try{

    const body = await req.json()

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    await supabase.from("core_events").insert({
      user_id: body.user_id || null,
      member_id: body.member_id || null,
      vin: body.vin || null,
      part_number: body.part || null,
      supplier_name: body.supplier || null,
      event_type: body.type,
      value: body.value || 0,
      source: body.source || "frontend",
      context: body.context || {}
    })

    return NextResponse.json({ success:true })

  }catch(e:any){

    return NextResponse.json({
      success:false,
      error:e.message
    })
  }
}
