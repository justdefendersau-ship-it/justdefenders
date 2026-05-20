import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// =====================================================
// JustDefenders ©
// File: app/api/supplier/inventory/route.ts
// Timestamp: 2026-05-06 09:45
// Purpose: Inventory aligned to member_profiles
// =====================================================

export async function POST(req:Request){

  const body = await req.json()

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  await supabase.from("supplier_inventory").upsert({
    member_id: body.member_id,
    part_number: body.part,
    price: body.price,
    stock: body.stock,
    updated_at: new Date().toISOString()
  })

  return NextResponse.json({ success:true })
}
