import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req:Request){

  const body = await req.json()

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  await supabase.from("pricing_events").insert({
    part_number: body.part,
    supplier_name: body.supplier,
    variant_id: body.variant_id,
    context_key: body.context,
    event_type: body.type,
    revenue: body.revenue || 0
  })

  if(body.type === "conversion"){
    await supabase.rpc("update_supplier_performance",{
      supplier_name: body.supplier
    })
  }

  return NextResponse.json({ success:true })
}
