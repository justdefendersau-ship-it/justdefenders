import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// =====================================================
// JustDefenders ©
// Track confirmed conversions (actual revenue events)
// =====================================================

export async function POST(req:Request){

  try{

    const body = await req.json()

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // --------------------------------------------------
    // LOG CONVERSION EVENT
    // --------------------------------------------------
    await supabase
      .from("pricing_events")
      .insert({
        part_number: body.part,
        supplier_name: body.supplier,
        variant_id: body.variant_id,
        context_key: body.context,
        event_type: "conversion",
        revenue: body.revenue || 0
      })

    // --------------------------------------------------
    // UPDATE VARIANT PERFORMANCE
    // --------------------------------------------------
    const { data: variant } = await supabase
      .from("pricing_variants")
      .select("*")
      .eq("id", body.variant_id)
      .single()

    if(variant){

      await supabase
        .from("pricing_variants")
        .update({
          conversions: (variant.conversions || 0) + 1,
          revenue: (variant.revenue || 0) + (body.revenue || 0)
        })
        .eq("id", body.variant_id)
    }

    // --------------------------------------------------
    // SUPPLIER PERFORMANCE LEARNING (NEGATIVE + POSITIVE)
    // --------------------------------------------------
    const { data: supplier } = await supabase
      .from("supplier_performance")
      .select("*")
      .eq("supplier_name", body.supplier)
      .single()

    if(supplier){

      await supabase
        .from("supplier_performance")
        .update({
          success_rate: Math.min((supplier.success_rate || 0.8) + 0.02, 1),
          avg_delivery_days: Math.max((supplier.avg_delivery_days || 5) - 0.2, 1),
          last_updated: new Date().toISOString()
        })
        .eq("supplier_name", body.supplier)

    } else {

      // auto-create supplier profile if missing
      await supabase
        .from("supplier_performance")
        .insert({
          supplier_name: body.supplier,
          success_rate: 0.85,
          avg_delivery_days: 4
        })
    }

    return NextResponse.json({ success:true })

  } catch(e:any){

    return NextResponse.json({
      success:false,
      error:e.message
    })
  }
}
