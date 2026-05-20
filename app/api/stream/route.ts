import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// =====================================================
// JustDefenders ©
// Event ingestion (clicks, conversions, searches)
// =====================================================

export async function POST(req:Request){

  const body = await req.json()

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  await supabase.from("event_stream").insert({
    event_type: body.type,
    part_number: body.part,
    supplier_name: body.supplier,
    value: body.value || 0
  })

  return NextResponse.json({ success:true })
}
