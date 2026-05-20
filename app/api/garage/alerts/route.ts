// =====================================================
// JustDefenders Â©
// Alerts API (GET + mark as done)
// =====================================================

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET(){

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data } = await supabase
    .from("maintenance_notifications")
    .select("*")
    .order("created_at", { ascending:false })

  return NextResponse.json({
    success:true,
    alerts:data
  })
}

export async function POST(req: Request){

  const body = await req.json()
  const { id } = body

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  await supabase
    .from("maintenance_notifications")
    .update({ triggered:true })
    .eq("id", id)

  return NextResponse.json({ success:true })
}