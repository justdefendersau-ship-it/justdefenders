import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET(){

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data } = await supabase
    .from("user_vehicles")
    .select("*")

  return NextResponse.json({ success:true, vehicles:data })
}