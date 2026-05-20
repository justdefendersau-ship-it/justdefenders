import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// =====================================================
// JustDefenders ©
// Negative feedback loop (reduce supplier trust score)
// =====================================================

export async function POST(req:Request){

  const body = await req.json()

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: supplier } = await supabase
    .from("supplier_performance")
    .select("*")
    .eq("supplier_name", body.supplier)
    .single()

  if(supplier){

    await supabase
      .from("supplier_performance")
      .update({
        success_rate: Math.max((supplier.success_rate || 0.8) - 0.05, 0.5),
        avg_delivery_days: (supplier.avg_delivery_days || 5) + 1,
        last_updated: new Date().toISOString()
      })
      .eq("supplier_name", body.supplier)
  }

  return NextResponse.json({ success:true })
}
